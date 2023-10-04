import Keycloak from "keycloak-js";
// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from
// 'keycloak.json'
const keycloak = new Keycloak({
  url: window._env_.REACT_APP_KEYCLOAK_CLIENT_URL,
  realm: window._env_.REACT_APP_KEYCLOAK_CLIENT_REALM || "",
  clientId: window._env_.REACT_APP_KEYCLOAK_CLIENT_CLIENT_ID || "",
});
export default keycloak;
