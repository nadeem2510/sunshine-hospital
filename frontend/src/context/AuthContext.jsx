import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem("adminToken");
    const username = localStorage.getItem("adminUsername");
    
    if (token && username) {
      // Verify token is still valid
      verifyToken(token).then(valid => {
        if (valid) {
          setUser({ username, token });
        } else {
          logout();
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.valid;
    } catch {
      return false;
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        username,
        password
      });
      
      const { token, username: user } = response.data;
      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminUsername", user);
      setUser({ username: user, token });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || "Login failed" 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsername");
    setUser(null);
  };

  const getAuthHeader = () => {
    const token = localStorage.getItem("adminToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, getAuthHeader }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
