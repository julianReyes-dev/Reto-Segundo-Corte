import { createContext, useContext, useState, useEffect } from 'react';
import { login, validateToken } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const isValid = await validateToken(token);
        if (isValid) {
          setUser({ token });
        } else {
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const token = await login(credentials.userId, credentials.password);
      localStorage.setItem('token', token);
      setUser({ token });
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login: handleLogin, 
      logout: handleLogout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);