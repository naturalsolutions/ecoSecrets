import { KeycloakInitOptions } from "keycloak-js";
import React, { createContext, useContext, useState, useEffect } from 'react';

import keycloak from "../keycloak";
import { OpenAPI } from "../client";

/**
 * KeycloakInitOptions configures the Keycloak client.
 */
const keycloakInitOptions: KeycloakInitOptions = {
  // Configure that Keycloak will check if a user is already authenticated (when opening the app or reloading the page). If not authenticated the user will be send to the login form. If already authenticated the webapp will open.
  onLoad: "login-required",
  pkceMethod: "S256",
  checkLoginIframe: false
};
/**
 * AuthContextValues defines the structure for the default values of the {@link AuthContext}.
 */
interface AuthContextValues {
  /**
   * Whether or not a user is currently authenticated
   */
  isAuthenticated: boolean;
  /**
   * Whether Keycloak has finished initializing
   */
  keycloakReady: boolean;
  /**
   * The name of the authenticated user
   */
  username: string;
  /**
   * The current token (JWT access token)
   */
  token?: string;
  /**
   * Function to log in
   */
  login: () => void;
  /**
   * Function to initiate the logout
   */
  logout: () => void;
  /**
   * Check if the user has the given role
   */
  hasRole: (role: string) => boolean;
}

/**
 * Default values for the {@link AuthContext}
 */
const defaultAuthContextValues: AuthContextValues = {
  isAuthenticated: false,
  keycloakReady: false,
  username: "",
  token: undefined,
  login: () => {},
  logout: () => {},
  hasRole: (role) => false,
};

/**
 * Create the AuthContext using the default values.
 */
export const AuthContext = createContext<AuthContextValues>(
  defaultAuthContextValues
);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  // Create the local state in which we will keep track if a user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  // Local state that will contain the users name once it is loaded
  const [username, setUsername] = useState<string>("");
  const [keycloakReady, setKeycloakReady] = useState(false);

  const setupKeycloakListeners = () => {
    keycloak.onTokenExpired = () => {
      keycloak.updateToken(0).catch(() => logout());
    };

    keycloak.onAuthLogout = () => {
      logout();
    };
  };

  const storeTokens = () => {
    if (keycloak.token) {
      localStorage.setItem("access_token", keycloak.token);
      OpenAPI.TOKEN = keycloak.token;
    }
    if (keycloak.refreshToken) {
      localStorage.setItem("refresh_token", keycloak.refreshToken);
    }
  };

  const initializeKeycloak = async () => {
    const savedAccessToken = localStorage.getItem("access_token");
    const savedRefreshToken = localStorage.getItem("refresh_token");

    //recupère la session du user si tjrs active et qu'il fermé/rouvert l'onglet/le navigateur
    if (savedAccessToken && savedRefreshToken) {
      keycloak.token = savedAccessToken;
      keycloak.refreshToken = savedRefreshToken;
    }

    try {
      const auth = await keycloak.init(keycloakInitOptions);
      
      if (!auth) {
        // Si non authentifié, force la connexion
        keycloak.login();
      } else {
        setIsAuthenticated(true);
        storeTokens();
        setKeycloakReady(true);
        setupKeycloakListeners();

        keycloak.loadUserProfile().then((profile) => {
          setUsername(profile.firstName || profile.username || "");
        });
      }
    } catch (error) {
      setIsAuthenticated(false);
      console.error("Error during Keycloak initialization:", error);
      logout();
    }
  };

useEffect(() => {

  initializeKeycloak();

  const intervalId = setInterval(() => {
    keycloak.updateToken(30).then((refreshed) => {
      if (refreshed) {
        storeTokens();
      }
    }).catch(() => {
      logout();
    });
  }, 10 * 1000); // Vérification toutes les 10 secondes

  return () => clearInterval(intervalId);
}, []);

// This effect loads the users profile in order to extract the username
useEffect(() => {
  /**
   * Load the profile for of the user from Keycloak
   */
  async function loadProfile() {
    try {
      const profile = await keycloak.loadUserProfile();
      if (profile.firstName) {
        setUsername(profile.firstName);
      } else if (profile.username) {
        setUsername(profile.username);
      }
    } catch {
      console.log("error trying to load the users profile");
    }
  }

   // Only load the profile if a user is authenticated
   if (isAuthenticated) {
    loadProfile();
  }
}, [isAuthenticated]);

 /**
   * Initiate the logout
   */
const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    OpenAPI.TOKEN = undefined;
    keycloak.logout();
  };

  const login = () => {
    keycloak.login();
  };
   /**
   * Check if the user has the given role
   * @param role to be checked
   * @returns whether or not if the user has the role
   */
   const hasRole = (role: string) => {
    return keycloak.hasRealmRole(role);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      username,
      keycloakReady,
      login,
      logout,
      token: keycloak.token,
      hasRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};
