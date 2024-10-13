import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { generateDataset } from '../api/gemini';
import Notification from './Notification';

const GenerateButton: React.FC = () => {
  const { 
    apiKey, 
    context, 
    promptTemplate, 
    temperature, 
    topP, 
    maxTokens, 
    safetySettings,
    setDataset,
    setApiResponse
  } = useAppContext();

  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setApiResponse(''); // Clear previous response
    try {
      const { generatedData, rawResponse } = await generateDataset(
        apiKey,
        {
          context,
          promptTemplate,
          temperature,
          topP,
          maxTokens,
          safetySettings
        },
        (text) => setApiResponse((prev) => prev + text) // Update API response in real-time
      );
      setDataset(generatedData);
      setNotification({ message: 'Dataset generated successfully!', type: 'success' });
    } catch (error) {
      console.error('Failed to generate dataset:', error);
      setNotification({ 
        message: error instanceof Error 
          ? `Error: ${error.message}. Please check your inputs and try again.` 
          : 'An unexpected error occurred. Please try again.',
        type: 'error'
      });
      setApiResponse('Error: ' + (error instanceof Error ? error.message : 'An unexpected error occurred.'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <button
        onClick={handleGenerate}
        disabled={isLoading || !apiKey}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${(isLoading || !apiKey) ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'Generating...' : 'Generate Dataset'}
      </button>
      {!apiKey && <p className="text-red-500 mt-2">Please enter your API key to generate a dataset.</p>}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default GenerateButton;