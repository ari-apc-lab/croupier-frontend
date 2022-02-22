// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { KeycloakOptions } from 'keycloak-angular';

// Keycloak config
export const keycloakSetUp: KeycloakOptions = {
  config: {
    url: 'https://hidalgo-idm.hlrs.de/auth',
    // url: 'https://prunus-212.man.poznan.pl/auth/',
    realm: 'Hidalgo',
    clientId: 'frontend',
    credentials: {
      secret: "d112469e-9386-4c00-b05d-7b6b5270bd3e"
      //secret: "e940c4ec-5204-41f2-b65a-b289983d9fbb"
    },
  },
  initOptions: {
    responseMode: 'fragment',
    flow: 'standard',
    onLoad: 'check-sso',
    //onLoad: 'login-required',
    checkLoginIframe: false
  },
  enableBearerInterceptor: true,
  bearerPrefix: 'Bearer',
  bearerExcludedUrls: [
    'localhost:4200/',
  ]
};

export const environment = {
  production: false,
  keycloak: keycloakSetUp,
  apiUrl: 'http://sophora-105.man.poznan.pl/'
  // apiUrl: 'http://62.3.171.105/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
