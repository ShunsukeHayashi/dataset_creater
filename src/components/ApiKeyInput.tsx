import React from 'react';
import { useAppContext } from '../context/AppContext';

const ApiKeyInput: React.FC = () => {
  const { apiKey, setApiKey } = useAppContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">Gemini API Key:</label>
      <input
        type="password"
        id="apiKey"
        value={apiKey}
        onChange={handleChange}
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Enter your Gemini API Key"
      />
      <p className="mt-1 text-sm text-gray-500">
        Don't have an API key? <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Get one here</a>
      </p>
    </div>
  );
};

export default ApiKeyInput;