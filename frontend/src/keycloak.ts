import Keycloak from "keycloak-js";
// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from
// 'keycloak.json'
console.log("yolo", process.env.REACT_APP_KEYCLOAK_CLIENT_REALM)
const keycloak = new Keycloak({
  url: process.env.REACT_APP_KEYCLOAK_CLIENT_URL,
  realm: process.env.REACT_APP_KEYCLOAK_CLIENT_REALM || "",
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_CLIENT_ID || "",
});
export default keycloak;
