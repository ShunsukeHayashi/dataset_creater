import React from 'react';
import { useAppContext } from '../context/AppContext';

const ExportOptions: React.FC = () => {
  const { dataset } = useAppContext();

  const handleExport = (format: 'CSV' | 'JSON') => {
    if (dataset.length === 0) {
      alert('No data to export. Please generate a dataset first.');
      return;
    }

    let content: string;
    let filename: string;
    let mimeType: string;

    if (format === 'CSV') {
      content = 'Question,Answer\n' + dataset.map(item => `"${item.input.replace(/"/g, '""')}","${item.output.replace(/"/g, '""')}"`).join('\n');
      filename = 'dataset.csv';
      mimeType = 'text/csv;charset=utf-8;';
    } else {
      content = JSON.stringify(dataset, null, 2);
      filename = 'dataset.json';
      mimeType = 'application/json;charset=utf-8;';
    }

    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Export Options</h2>
      <div className="space-x-2">
        <button
          onClick={() => handleExport('CSV')}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Export CSV
        </button>
        <button
          onClick={() => handleExport('JSON')}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Export JSON
        </button>
      </div>
    </div>
  );
};

export default ExportOptions;