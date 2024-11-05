// jwt토큰 관리 및 로그인 상태 관리 

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode; // children의 타입
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('jwtToken'));

  const handleSetToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem('jwtToken', newToken);
    } else {
      localStorage.removeItem('jwtToken');
    }
    setToken(newToken);
  };

  const logout = () => {
    handleSetToken(null);
    alert('로그아웃 되었습니다.');
  };

  return (
    <AuthContext.Provider value={{ token, setToken: handleSetToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('error');
  }
  return context;
};
