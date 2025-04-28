import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { OpenAPI } from '../client';
import { AuthContext } from '../contexts/AuthContextProvider';
import keycloak from '../keycloak';;


const TOKEN_MIN_VALIDITY = 120;


export const useRefreshToken = () => {
  const [pending, setPending] = useState(true);
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const onTokenRefresh = (token: string | undefined) => {
    if (token) {
      OpenAPI.TOKEN = token;
    }
  }

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const refreshed = await keycloak.updateToken(TOKEN_MIN_VALIDITY);
        if (refreshed) {
          onTokenRefresh(keycloak.token);
        }
        setPending(false);
      } catch (error) {
        logout();
      }
    }

    refreshToken();
  }, [location]);

  return { pending };
};
