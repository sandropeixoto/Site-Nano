import React, { useEffect, useState } from 'react';
import { account } from '../../lib/appwrite';
import { Models } from 'appwrite';
import { AuthContext } from './AuthContextDefinition';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      const session = await account.get();
      setUser(session);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, pass: string) => {
    await account.createEmailPasswordSession(email, pass);
    const session = await account.get();
    setUser(session);
  };

  const logout = async () => {
    await account.deleteSession('current');
    setUser(null);
  };

  const recoverPassword = async (email: string) => {
    const url = `${window.location.origin}/admin/reset-password`;
    await account.createRecovery(email, url);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, recoverPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
