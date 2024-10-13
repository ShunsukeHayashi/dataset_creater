import React from 'react';
import { useAppContext } from '../context/AppContext';

const PromptTemplate: React.FC = () => {
  const { promptTemplate, setPromptTemplate, context } = useAppContext();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPromptTemplate(e.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor="promptTemplate" className="block text-sm font-medium text-gray-700">Prompt Template:</label>
      <textarea
        id="promptTemplate"
        value={promptTemplate}
        onChange={handleChange}
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        rows={5}
        placeholder="Enter your prompt template (use {context} for context insertion)"
      ></textarea>
      <p className="mt-1 text-sm text-gray-500">
        Default: Based on the following context, generate 5 question-answer pairs in JSON format. 
        Each pair should be an object with "question" and "answer" keys.
        Context: {context}
      </p>
    </div>
  );
};

export default PromptTemplate;