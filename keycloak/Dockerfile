FROM quay.io/keycloak/keycloak:26.3.4

ADD --chown=root:root https://github.com/moparisthebest/static-curl/releases/latest/download/curl-amd64 /usr/bin/curl
USER root
RUN chmod +x /usr/bin/curl

COPY ./realm.json /opt/keycloak/data/import/realm.json
COPY ./theme/customtheme /opt/keycloak/themes/customtheme

USER keycloak
