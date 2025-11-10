import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { useToken } from '../hooks/useToken';
import { LoggedUser } from '@/modules/Profile/models/user.models';
import { decodeToken } from '../utils/utils';
import { useNavigate } from '@tanstack/react-router';
import { getUserProfile } from '@/modules/Profile/apis/user.api';

interface AuthContextType {
  user: LoggedUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: LoggedUser) => void;
  logout: () => void;
  updateUser: (user: LoggedUser) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<LoggedUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token, setToken, removeToken, getToken } = useToken();
  const navigate = useNavigate();
  const shouldNavigateToLogin = useRef(false);

  const updateUserDetails = async (currentToken: string) => {
    const decodedUser = decodeToken(currentToken);
    const userDetails = await getUserProfile(decodedUser.username);
    const newUserData: LoggedUser = {
      id: userDetails.id,
      fullName: userDetails.fullName,
        username: userDetails.username,
        email: userDetails.email,
        theme: userDetails.settings.theme,
        language: userDetails.settings.language,
        role: decodedUser.role
    }
    setUser(newUserData);
  }

  // Initialize authentication state
  useEffect(() => {
    const initializeAuth = async () => {
      const currentToken = getToken();
      if (currentToken) {
        try {
          updateUserDetails(currentToken);
        } catch {
          removeToken();
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [getToken, removeToken]);

  // Sync user state with token changes
  useEffect(() => {
    if (!token && user) {
      // Token was removed but user state still exists
      setUser(null);
    } else if (token && !user) { 
      // Token exists but no user state, try to decode
      try {
        updateUserDetails(token);
      } catch {
        removeToken();
        setUser(null);
      }
    }
  }, [token, user, removeToken]);

  // Handle navigation to login after logout
  useEffect(() => {
    if (shouldNavigateToLogin.current) {
      navigate({ to: '/login', replace: true });
      shouldNavigateToLogin.current = false;
    }
  }, [user, navigate]);

  const login = (newToken: string, userData: LoggedUser) => {
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    removeToken();
    setUser(null);
    shouldNavigateToLogin.current = true;
  };

  const updateUser = (updatedUser: LoggedUser) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 