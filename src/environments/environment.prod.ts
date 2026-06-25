import { QzTrayEnvironmentConfig, defaultQzTrayConfig } from './environment.qz';

export const environment = {
  api: 'https://sapi.sinergydigital.mx/api',
  production: true,
  qzTray: {
    ...defaultQzTrayConfig,
    signingEnabled: false,
    certificateUrl: 'https://sapi.sinergydigital.mx/api/tenant/qz/digital-certificate',
    signUrl: 'https://sapi.sinergydigital.mx/api/tenant/qz/sign',
  } satisfies QzTrayEnvironmentConfig,
};
