import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface UserContextType {
  username: string;
  setUsername: (username: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // Initialize username from localStorage
  const [username, setUsername] = useState<string>(() => {
    return localStorage.getItem('username') || '';
  });

  // Persist username to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('username', username);
  }, [username]);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};
