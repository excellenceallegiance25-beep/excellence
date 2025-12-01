
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const registeredUsers = localStorage.getItem('registeredUsers');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (!registeredUsers) {
      localStorage.setItem('registeredUsers', JSON.stringify([]));
    }
    
    setLoading(false);
  }, []);
  const isUserRegistered = (email) => {
    try {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      return registeredUsers.some(user => user.email === email);
    } catch (error) {
      console.error('Error checking user registration:', error);
      return false;
    }
  };

 
  const verifyLogin = (email, password) => {
    try {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const user = registeredUsers.find(user => 
        user.email === email && user.password === password
      );
      return user || null;
    } catch (error) {
      console.error('Error verifying login:', error);
      return null;
    }
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    existingUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    return newUser;
  };

  const value = {
    user,
    login,
    logout,
    register,
    isUserRegistered,
    verifyLogin,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};