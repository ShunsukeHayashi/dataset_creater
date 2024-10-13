import React, { createContext, useState, useContext, ReactNode } from 'react';
import { config } from '../config/env';

interface SafetySettings {
  [key: string]: string;
}

interface DatasetItem {
  input: string;
  output: string;
}

interface AppContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
  context: string;
  setContext: (context: string) => void;
  promptTemplate: string;
  setPromptTemplate: (template: string) => void;
  temperature: number;
  setTemperature: (temp: number) => void;
  topP: number;
  setTopP: (topP: number) => void;
  maxTokens: number;
  setMaxTokens: (tokens: number) => void;
  safetySettings: SafetySettings;
  setSafetySettings: (settings: SafetySettings) => void;
  dataset: DatasetItem[];
  setDataset: (data: DatasetItem[]) => void;
  apiResponse: string;
  setApiResponse: (response: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiKey, setApiKey] = useState(config.defaultApiKey);
  const [context, setContext] = useState(config.defaultContext);
  const [promptTemplate, setPromptTemplate] = useState(config.defaultPromptTemplate);
  const [temperature, setTemperature] = useState(config.defaultTemperature);
  const [topP, setTopP] = useState(config.defaultTopP);
  const [maxTokens, setMaxTokens] = useState(config.defaultMaxTokens);
  const [safetySettings, setSafetySettings] = useState<SafetySettings>({
    HARM_CATEGORY_HARASSMENT: 'BLOCK_NONE',
    HARM_CATEGORY_HATE_SPEECH: 'BLOCK_NONE',
    HARM_CATEGORY_SEXUALLY_EXPLICIT: 'BLOCK_NONE',
    HARM_CATEGORY_DANGEROUS_CONTENT: 'BLOCK_NONE',
  });
  const [dataset, setDataset] = useState<DatasetItem[]>([]);
  const [apiResponse, setApiResponse] = useState('');

  return (
    <AppContext.Provider value={{
      apiKey, setApiKey,
      context, setContext,
      promptTemplate, setPromptTemplate,
      temperature, setTemperature,
      topP, setTopP,
      maxTokens, setMaxTokens,
      safetySettings, setSafetySettings,
      dataset, setDataset,
      apiResponse, setApiResponse
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};