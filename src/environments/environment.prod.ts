// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { KeycloakOptions } from 'keycloak-angular';

// Keycloak config
const keycloakSetUp: KeycloakOptions = {
  config: {
    url: 'https://keycloak.croupier.ari-aidata.eu/auth',
    realm: 'permedcoe',
    clientId: 'croupier',
    credentials: {
      secret: "MNyVuESO4DPHL8TzrbLsESSUCxiFgC4Q"
    },
  },
  initOptions: {
    responseMode: 'fragment',
    flow: 'standard',
     onLoad: 'check-sso',
    checkLoginIframe: false
  },
};
  /*
  initOptions: {
    responseMode: 'fragment',
    flow: 'standard',
    onLoad: 'login-required',
    checkLoginIframe: false
  },
  enableBearerInterceptor: true,
};*/

export const environment = {
  production: false,
  keycloak: keycloakSetUp,
  apiUrl: 'https://backend.croupier.ari-aidata.eu/'
};
