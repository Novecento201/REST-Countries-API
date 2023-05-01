import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [inputData, setInputData] = useState({
    search: '',
    region: 'All regions',
  });

  const [isLoading, setIsLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{ isLoading, setIsLoading, inputData, setInputData }}
    >
      {children}
    </AppContext.Provider>
  );
};
