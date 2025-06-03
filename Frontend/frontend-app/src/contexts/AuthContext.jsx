import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
// import { jwtDecode } from 'jwt-decode'; // Descomentar si necesitas decodificar el token

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  // const [user, setUser] = useState(null); // Opcional: para guardar datos del usuario decodificados
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      // try { // Descomentar si usas jwt-decode
      //   const decoded = jwtDecode(storedToken);
      //   setUser(decoded); // Guarda los datos decodificados del usuario
      // } catch (error) {
      //   console.error("Invalid token:", error);
      //   logout();
      // }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = async (userId, password) => {
    try {
      const response = await axiosInstance.post('/api/auth/login', { userId, password });
      const { token: newToken } = response.data;
      localStorage.setItem('authToken', newToken);
      setToken(newToken);
      setIsAuthenticated(true);
      // try { // Descomentar si usas jwt-decode
      //   const decoded = jwtDecode(newToken);
      //   setUser(decoded);
      // } catch (error) {
      //   console.error("Error decoding new token:", error);
      // }
      navigate('/'); // Redirige al dashboard o página principal
      return true;
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      logout(); // Asegura que el estado esté limpio si el login falla
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setIsAuthenticated(false);
    // setUser(null); // Descomentar si usas user state
    navigate('/login');
  };

  // Opcional: validar token con el backend (ej. al cargar la app)
  // useEffect(() => {
  //   const validateCurrentToken = async () => {
  //     if (token) {
  //       try {
  //         await axiosInstance.post('/api/auth/validate'); // El interceptor ya añade el token
  //         setIsAuthenticated(true);
  //       } catch (error) {
  //         console.error('Token validation failed:', error);
  //         logout();
  //       }
  //     }
  //   };
  //   validateCurrentToken();
  // }, [token]); // Ejecutar cuando el token cambie (ej. al inicio)


  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout /*, user */ }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);