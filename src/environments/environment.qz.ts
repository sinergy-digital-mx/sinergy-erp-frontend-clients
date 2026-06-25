/** Configuración QZ Tray (firma digital → impresión sin popup "Untrusted website"). */
export interface QzTrayEnvironmentConfig {
  /** Activa setCertificatePromise + setSignaturePromise antes de conectar. */
  signingEnabled: boolean;
  /** Certificado público (.txt x509). Puede ser URL del API o /assets/qz/digital-certificate.txt */
  certificateUrl: string;
  /** Endpoint GET que firma ?request=... y devuelve base64 (SHA512). Requiere auth si aplica. */
  signUrl: string;
}

export const defaultQzTrayConfig: QzTrayEnvironmentConfig = {
  signingEnabled: false,
  certificateUrl: '/assets/qz/digital-certificate.txt',
  signUrl: '',
};
