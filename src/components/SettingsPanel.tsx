import React from 'react';
import { useAppContext } from '../context/AppContext';

const SettingsPanel: React.FC = () => {
  const { temperature, setTemperature, topP, setTopP, maxTokens, setMaxTokens } = useAppContext();

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Generation Settings</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">Temperature:</label>
          <input
            type="number"
            id="temperature"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            min="0"
            max="1"
            step="0.1"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="topP" className="block text-sm font-medium text-gray-700">Top P:</label>
          <input
            type="number"
            id="topP"
            value={topP}
            onChange={(e) => setTopP(Number(e.target.value))}
            min="0"
            max="1"
            step="0.1"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="maxTokens" className="block text-sm font-medium text-gray-700">Max Tokens:</label>
          <input
            type="number"
            id="maxTokens"
            value={maxTokens}
            onChange={(e) => setMaxTokens(Number(e.target.value))}
            min="1"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;