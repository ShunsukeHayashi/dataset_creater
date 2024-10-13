import React from 'react';
import { useAppContext } from '../context/AppContext';

const ContextInput: React.FC = () => {
  const { context, setContext } = useAppContext();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContext(e.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor="context" className="block text-sm font-medium text-gray-700">Context:</label>
      <textarea
        id="context"
        value={context}
        onChange={handleChange}
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        rows={4}
        placeholder="Enter the base context for dataset generation"
      ></textarea>
      <p className="mt-1 text-sm text-gray-500">Default: AI assistant for creating question-answer pairs on various topics.</p>
    </div>
  );
};

export default ContextInput;