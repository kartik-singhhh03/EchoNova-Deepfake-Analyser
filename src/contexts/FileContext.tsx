import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FileContextType {
  file: File | null;
  setFile: (file: File | null) => void;
  analysisResults: any;
  setAnalysisResults: (results: any) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const useFile = (): FileContextType => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('useFile must be used within a FileProvider');
  }
  return context;
};

interface FileProviderProps {
  children: ReactNode;
}

export const FileProvider: React.FC<FileProviderProps> = ({ children }) => {
  const [file, setFile] = useState<File | null>(null);
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const value: FileContextType = {
    file,
    setFile,
    analysisResults,
    setAnalysisResults,
  };

  return (
    <FileContext.Provider value={value}>
      {children}
    </FileContext.Provider>
  );
};