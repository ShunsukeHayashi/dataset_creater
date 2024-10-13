import React from 'react';
import Header from './components/Header';
import ApiKeyInput from './components/ApiKeyInput';
import ContextInput from './components/ContextInput';
import PromptTemplate from './components/PromptTemplate';
import SettingsPanel from './components/SettingsPanel';
import SafetySettings from './components/SafetySettings';
import GenerateButton from './components/GenerateButton';
import DatasetTable from './components/DatasetTable';
import ExportOptions from './components/ExportOptions';
import ApiResponse from './components/ApiResponse';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <div className="container mx-auto p-4">
        <Header />
        <ApiKeyInput />
        <ContextInput />
        <PromptTemplate />
        <SettingsPanel />
        <SafetySettings />
        <GenerateButton />
        <ApiResponse />
        <DatasetTable />
        <ExportOptions />
      </div>
    </AppProvider>
  );
}

export default App;