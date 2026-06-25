// src/app/features/pos/constants/pos-api-errors.ts
var POS_API_ERROR_MESSAGES = {
  "C\xF3digo de vendedor no v\xE1lido": "El c\xF3digo no existe o pertenece a un usuario POS.",
  "No hay corte global abierto en la sucursal": "No hay corte abierto en esta sucursal. La terminal de cobranza debe abrir el corte del d\xEDa.",
  "Solo terminales de tipo COBRANZA pueden abrir el corte global": "Solo la terminal de cobranza puede abrir el corte del d\xEDa.",
  "La orden no est\xE1 pendiente de cobro": "Esta venta ya fue cobrada o no est\xE1 pendiente.",
  "No se puede cobrar una orden en cola": "Esta venta est\xE1 en cola. Cobranza debe abrir el corte del d\xEDa para asignarla antes de cobrar.",
  "No se puede cambiar el tipo POS de un usuario con corte global abierto": "No se puede modificar este usuario COBRANZA mientras tenga un corte abierto."
};
function mapPosApiErrorMessage(message) {
  if (!message) {
    return "Ocurri\xF3 un error en el POS.";
  }
  if (message.startsWith("El c\xF3digo") && message.includes("ya est\xE1 asignado")) {
    return "Ese c\xF3digo de vendedor ya est\xE1 asignado a otro usuario en el tenant.";
  }
  return POS_API_ERROR_MESSAGES[message] ?? message;
}

export {
  mapPosApiErrorMessage
};
//# sourceMappingURL=chunk-B2KGUYHG.js.map
