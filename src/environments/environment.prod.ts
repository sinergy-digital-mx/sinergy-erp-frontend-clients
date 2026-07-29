import { QzTrayEnvironmentConfig, defaultQzTrayConfig } from './environment.qz';

export const environment = {
  api: 'https://sapi.sinergydigital.mx/api',
  production: true,
  googleMapsApiKey: 'AIzaSyB6MRa342zIAjDI1oqv5uwdSAb6nnKK9Bs',
  qzTray: {
    ...defaultQzTrayConfig,
    signingEnabled: false,
    certificateUrl: 'https://sapi.sinergydigital.mx/api/tenant/qz/digital-certificate',
    signUrl: 'https://sapi.sinergydigital.mx/api/tenant/qz/sign',
  } satisfies QzTrayEnvironmentConfig,
};
