import React from 'react';
import { useAppContext } from '../context/AppContext';

const DatasetTable: React.FC = () => {
  const { dataset } = useAppContext();

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Generated Dataset</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Answer</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {dataset.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-pre-wrap">{item.input}</td>
              <td className="px-6 py-4 whitespace-pre-wrap">{item.output}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DatasetTable;