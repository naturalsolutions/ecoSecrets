import { KeycloakInitOptions } from "keycloak-js";
import { createContext, useEffect, useState } from "react";
import keycloak from "../keycloak";
import { OpenAPI } from "../client";

/**
 * KeycloakInitOptions configures the Keycloak client.
 */
const keycloakInitOptions: KeycloakInitOptions = {
  // Configure that Keycloak will check if a user is already authenticated (when opening the app or reloading the page). If not authenticated the user will be send to the login form. If already authenticated the webapp will open.
  onLoad: "login-required",
  pkceMethod: "S256",
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
   * The name of the authenticated user
   */
  username: string;
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
  username: "",
  logout: () => {},
  hasRole: (role) => false,
};

/**
 * Create the AuthContext using the default values.
 */
export const AuthContext = createContext<AuthContextValues>(
  defaultAuthContextValues
);

/**
 * The props that must be passed to create the {@link AuthContextProvider}.
 */
interface AuthContextProviderProps {
  /**
   * The elements wrapped by the auth context.
   */
  children: JSX.Element;
}

/**
 * AuthContextProvider is responsible for managing the authentication state of the current user.
 *
 * @param props
 */
const AuthContextProvider = (props: AuthContextProviderProps) => {

  // Create the local state in which we will keep track if a user is authenticated
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  // Local state that will contain the users name once it is loaded
  const [username, setUsername] = useState<string>("");

  // Effect used to initialize the Keycloak client. It has no dependencies so it is only rendered when the app is (re-)loaded.
  useEffect(() => {
    /**
     * Initialize the Keycloak instance
     */
    async function initializeKeycloak() {
      try {
        const isAuthenticatedResponse = await keycloak.init(
          keycloakInitOptions
        );
        // If the authentication was not successfull the user is send back to the Keycloak login form
        if (!isAuthenticatedResponse) {
          keycloak.login();
        }
        // If we get here the user is authenticated and we can update the state accordingly
        OpenAPI.TOKEN = keycloak.token
        setAuthenticated(isAuthenticatedResponse);
      } catch (err) {
        setAuthenticated(false);
        throw err;
      }
    }

    initializeKeycloak();
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
      OpenAPI.TOKEN = keycloak.token
      loadProfile();
    }
  }, [isAuthenticated]);

  /**
   * Initiate the logout
   */
  const logout = () => {
    keycloak.logout();
  };

  /**
   * Check if the user has the given role
   * @param role to be checked
   * @returns whether or not if the user has the role
   */
  const hasRole = (role: string) => {
    return keycloak.hasRealmRole(role);
  };

  // Setup the context provider
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, username, logout, hasRole }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
