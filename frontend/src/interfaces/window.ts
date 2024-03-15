// Declare this file as module
export {}; 

interface Env {
  REACT_APP_API_PATH: string;
  REACT_APP_KEYCLOAK_CLIENT_URL: string;
  REACT_APP_KEYCLOAK_CLIENT_REALM: string;
  REACT_APP_KEYCLOAK_CLIENT_CLIENT_ID: string;
}

declare global { interface Window {
  _env_: Env;
}}
