export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64 = dataUrl.split(',')[1];
      if (!base64) {
        reject(new Error('No se pudo leer el archivo'));
        return;
      }
      resolve(base64);
    };
    reader.onerror = () => reject(reader.error ?? new Error('Error al leer el archivo'));
    reader.readAsDataURL(file);
  });
}

export function isCerFile(file: File): boolean {
  const name = file.name.toLowerCase();
  return name.endsWith('.cer') || file.type === 'application/x-x509-ca-cert' || file.type === 'application/pkix-cert';
}

export function isKeyFile(file: File): boolean {
  const name = file.name.toLowerCase();
  return name.endsWith('.key') || name.endsWith('.pem');
}
