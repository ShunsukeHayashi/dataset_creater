import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

export interface GenerationParams {
  context: string;
  promptTemplate: string;
  temperature: number;
  topP: number;
  maxTokens: number;
  safetySettings: {
    [key: string]: string;
  };
}

interface QAPair {
  question: string;
  answer: string;
}

export const generateDataset = async (
  apiKey: string,
  params: GenerationParams,
  onUpdate: (text: string) => void
) => {
  try {
    if (!apiKey) {
      throw new Error('API key is missing. Please enter your Gemini API key.');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      generationConfig: {
        temperature: params.temperature,
        topP: params.topP,
        maxOutputTokens: params.maxTokens,
      },
      safetySettings: Object.entries(params.safetySettings).map(([category, threshold]) => ({
        category: category as HarmCategory,
        threshold: threshold as HarmBlockThreshold,
      })),
    });

    const prompt = `${params.promptTemplate.replace('{context}', params.context)}
    
    Please format your response as a JSON object with the following structure:
    {
      "qaPairs": [
        {
          "question": "Question text here",
          "answer": "Answer text here"
        },
        // ... more question-answer pairs
      ]
    }`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const response = result.response;
    onUpdate(response.text()); // Update with raw response first

    let jsonResponse;
    try {
      // Attempt to parse the entire response as JSON
      jsonResponse = JSON.parse(response.text());
    } catch (error) {
      console.error('Failed to parse entire response as JSON:', error);
      
      // If parsing fails, try to extract JSON from the response
      const jsonMatch = response.text().match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          jsonResponse = JSON.parse(jsonMatch[0]);
        } catch (innerError) {
          console.error('Failed to parse extracted JSON:', innerError);
          throw new Error('The API response did not contain valid JSON. Please try again or adjust your prompt.');
        }
      } else {
        throw new Error('The API response did not contain a valid JSON structure. Please try again or adjust your prompt.');
      }
    }
    
    if (!jsonResponse || !jsonResponse.qaPairs || !Array.isArray(jsonResponse.qaPairs)) {
      throw new Error('The API response did not contain the expected "qaPairs" array. Please try again or adjust your prompt.');
    }

    const pairs: QAPair[] = jsonResponse.qaPairs.map((pair: QAPair) => ({
      input: pair.question,
      output: pair.answer,
    }));

    return {
      generatedData: pairs,
      rawResponse: JSON.stringify(jsonResponse, null, 2)
    };
  } catch (error) {
    console.error('Error in generateDataset:', error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('An unexpected error occurred. Please try again later.');
    }
  }
};