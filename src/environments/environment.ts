// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { KeycloakConfig, KeycloakInitOptions, KeycloakOptions } from 'keycloak-angular';

// Keycloak config
const keycloakSetUp: KeycloakOptions = {
  config: {
    url: 'https://hidalgo-idm.hlrs.de/auth/',
    // url: 'https://prunus-212.man.poznan.pl/auth/',
    realm: 'Hidalgo',
    clientId: 'frontend',
  },
  initOptions: {
    responseMode: 'fragment',
    flow: 'standard',
    onLoad: 'check-sso'
  },
  enableBearerInterceptor: true,
};

export const environment = {
  production: false,
  keycloak: keycloakSetUp,
  apiUrl: 'https://sophora-105.man.poznan.pl/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
