// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { QzTrayEnvironmentConfig, defaultQzTrayConfig } from './environment.qz';

export const environment = {
  // Local Host
  api: 'http://localhost:3001/api',
  // api: 'https://sapi.sinergydigital.mx',
  production: false,
  /** QZ Tray: activar cuando el backend exponga certificado + firma (ver docs QZ Signing). */
  qzTray: {
    ...defaultQzTrayConfig,
    signUrl: 'http://localhost:3001/api/tenant/qz/sign',
  } satisfies QzTrayEnvironmentConfig,
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
