// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { KeycloakOptions } from 'keycloak-angular';

// Keycloak config
const keycloakSetUp: KeycloakOptions = {
  config: {
    url: 'https://hidalgo-idm.hlrs.de/auth/',
    realm: 'Hidalgo',
    clientId: 'frontend',
  },
  initOptions: {
    responseMode: 'fragment',
    flow: 'standard',
    onLoad: 'login-required',
    checkLoginIframe: false
  },
  enableBearerInterceptor: true,
};

export const environment = {
  production: true,
  keycloak: keycloakSetUp,
  apiUrl: 'http://sophora-105.man.poznan.pl/'
};
