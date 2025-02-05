import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(null);
  const authToken = localStorage.getItem('token');

  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    setAuthState(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    if (
      authToken &&
      authToken !== null &&
      authToken !== 'null' &&
      authToken !== ''
    ) {
      let user;
      user = jwtDecode(authToken.slice(7));
      setAuthState(user);
    } else {
      if (
        location.pathname !== '/forgot_pass' &&
        !location.pathname.startsWith('/reset_pass')
      ) {
        navigate('/login');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, logout, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
