import { createContext, useContext } from 'react';

/**
 * Статический режим без backend.
 * Регистрация через Google Form, авторизация и профиль не используются.
 */
const AuthContext = createContext(null);

const staticValue = {
  user: null,
  token: null,
  loading: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateUser: () => {},
  isAuthenticated: false,
  isAdmin: false,
  isModerator: false,
};

export const AuthProvider = ({ children }) => (
  <AuthContext.Provider value={staticValue}>
    {children}
  </AuthContext.Provider>
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
