// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { KeycloakOptions } from 'keycloak-angular';

// Keycloak config
export const keycloakSetUp: KeycloakOptions = {
  config: {
    url: 'https://keycloak.croupier.ari-aidata.eu/auth/',
    //url: 'https://prunus-212.man.poznan.pl/auth',
    realm: 'permedcoe',
    //realm: 'Hidalgo',
    clientId: 'croupier',
    //clientId: 'frontend',
    credentials: {
    	secret: "R79h2Bs2z1RSHozOXXb36ewlqZT0CRTp"
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


// Backend config
export const environment = {
  production: false,
  keycloak: keycloakSetUp,
  //apiUrl: 'http://localhost:8000/'
  apiUrl: 'https://backend.croupier.ari-aidata.eu/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
