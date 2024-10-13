import React from 'react';
import { useAppContext } from '../context/AppContext';

const safetyCategories = [
  { key: 'HARM_CATEGORY_HARASSMENT', label: 'Harassment' },
  { key: 'HARM_CATEGORY_HATE_SPEECH', label: 'Hate Speech' },
  { key: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', label: 'Sexually Explicit' },
  { key: 'HARM_CATEGORY_DANGEROUS_CONTENT', label: 'Dangerous Content' },
];

const thresholds = [
  { value: 'BLOCK_NONE', label: 'Block None' },
  { value: 'BLOCK_LOW_AND_ABOVE', label: 'Block Low & Above' },
  { value: 'BLOCK_MEDIUM_AND_ABOVE', label: 'Block Medium & Above' },
  { value: 'BLOCK_ONLY_HIGH', label: 'Block Only High' },
];

const SafetySettings: React.FC = () => {
  const { safetySettings, setSafetySettings } = useAppContext();

  const handleSafetyChange = (category: string, threshold: string) => {
    setSafetySettings((prev) => ({
      ...prev,
      [category]: threshold,
    }));
  };

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Safety Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {safetyCategories.map((category) => (
          <div key={category.key}>
            <label htmlFor={category.key} className="block text-sm font-medium text-gray-700">
              {category.label}:
            </label>
            <select
              id={category.key}
              value={safetySettings[category.key]}
              onChange={(e) => handleSafetyChange(category.key, e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {thresholds.map((threshold) => (
                <option key={threshold.value} value={threshold.value}>
                  {threshold.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SafetySettings;