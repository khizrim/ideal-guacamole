import type { ReactNode } from 'react';
import { useContext, useEffect, useState } from 'react';

import { authAPI } from 'src/pages/SignInPage';
import type { Nullable } from 'src/shared/types/global';
import type { TUser } from 'src/shared/types/user';
import Helpers from 'src/utils/helpers';

import type { AuthContextType } from './AuthProvider.context';
import { AuthContext } from './AuthProvider.context';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Nullable<TUser>>(null);
  const [userIsLoading, setUserIsLoading] = useState(true);

  const isAuthenticated = async () => {
    setUserIsLoading(true);

    try {
      await authAPI.getuser(updateUser, errorHandler);
    } catch (err) {
      errorHandler(err);
    } finally {
      setUserIsLoading(false);
    }
  };

  const updateUser = (user: TUser) => {
    setUser(user);
  };

  const errorHandler = (err: unknown) => {
    Helpers.Log('ERROR', err);
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, userIsLoading, setUser, setUserIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
