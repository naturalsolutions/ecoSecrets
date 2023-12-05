# Keycloak

Keycloak est la technologie utilisée dans GeoCam pour **gérer les droits et les utilisateurs**. Pour le moment, seule la gestion de l'authentification est implémentée. Il n'est pas possible de donner des droits différents aux utilisateurs d'une instance.

Vous pouvez plus d'information sur cette technologie [ici](https://www.keycloak.org/guides#getting-started)

L'interface administrateur de keycloak, sur laquelle vous pouvez vous y connecter grâce au même identifiant que l'application GeoCam (si vous avez les droits administrateurs) est disponible sur : /auth/admin/geonature-annotation/console/

## Configuration du serveur mail

Certaines fonctionnalités nécessitent l'**envoie de mail par l'application**. Pour cela, il est nécessaire de configurer un serveur au sein de l'interface de keycloak dans les _"Realm settings"_ dans l'onglet _"Email"_ : <br>
/auth/admin/geonature-annotation/console/#/geonature-annotation/realm-settings/email
Il faut à minima renseigner le champ _"from"_ dans la catégorie _Template_ et la catégorie _Connection & Authentification_

## Gestion des utilisateurs

Voir le guide utilisateur > rubrique _Administrateur - Keycloak_
