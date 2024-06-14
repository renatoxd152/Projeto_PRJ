import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState } from 'react';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const getUserType = () => {
    if (!token) return null;

    const decodedToken = jwtDecode(token);
    return decodedToken.userType;
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, getUserType}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};