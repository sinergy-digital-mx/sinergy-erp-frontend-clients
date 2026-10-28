/** Texto de la lista: si la unidad o el chofer ya pueden timbrar carta porte. */
export function cartaPorteReadyLabel(ready: boolean | null | undefined): string {
  return ready ? 'Carta porte completo' : 'Carta porte no completo';
}

/** Claves que Finkok envía al SAT en Carta Porte 3.1. Se guarda la clave, no la descripción. */

export interface SatCatalogItem {
  code: string;
  label: string;
}

/** c_TipoPermiso → PermSCT */
export const SAT_TIPO_PERMISO: SatCatalogItem[] = [
  { code: 'TPAF01', label: 'Autotransporte federal de carga general' },
  { code: 'TPAF02', label: 'Transporte privado de carga' },
  { code: 'TPAF03', label: 'Carga especializada de materiales y residuos peligrosos' },
  { code: 'TPAF04', label: 'Transporte de automóviles sin rodar en góndola' },
  { code: 'TPAF05', label: 'Carga de gran peso o volumen hasta 90 toneladas' },
  { code: 'TPAF06', label: 'Carga especializada de gran peso o volumen de más de 90 toneladas' },
  { code: 'TPAF07', label: 'Transporte privado de materiales y residuos peligrosos' },
  { code: 'TPAF08', label: 'Autotransporte internacional de carga de largo recorrido' },
  { code: 'TPAF09', label: 'Internacional de carga especializada de residuos peligrosos' },
  { code: 'TPAF10', label: 'Carga general en franja fronteriza con Estados Unidos' },
  { code: 'TPAF11', label: 'Carga especializada en franja fronteriza con Estados Unidos' },
  { code: 'TPAF12', label: 'Servicio auxiliar de arrastre' },
  { code: 'TPAF13', label: 'Arrastre, salvamento y depósito de vehículos' },
  { code: 'TPAF14', label: 'Paquetería y mensajería' },
  { code: 'TPAF15', label: 'Tránsito de grúas industriales de más de 90 toneladas' },
  { code: 'TPAF16', label: 'Empresas arrendadoras de servicio público federal' },
  { code: 'TPAF17', label: 'Empresas trasladistas de vehículos nuevos' },
  { code: 'TPAF18', label: 'Fabricantes o distribuidoras de vehículos nuevos' },
  { code: 'TPAF19', label: 'Configuraciones especiales o vehículos blindados' },
  { code: 'TPAF20', label: 'Carga especializada de fondos y valores' },
  { code: 'TPXX00', label: 'Permiso no contemplado en el catálogo' },
];

/** c_ConfigAutotransporte → ConfigVehicular */
export const SAT_CONFIG_AUTOTRANSPORTE: SatCatalogItem[] = [
  { code: 'VL', label: 'Vehículo ligero de carga' },
  { code: 'C2', label: 'Camión unitario, 2 ejes' },
  { code: 'C3', label: 'Camión unitario, 3 ejes' },
  { code: 'C2R2', label: 'Camión con remolque, 4 ejes' },
  { code: 'C3R2', label: 'Camión con remolque, 5 ejes' },
  { code: 'C2R3', label: 'Camión con remolque, 5 ejes' },
  { code: 'C3R3', label: 'Camión con remolque, 6 ejes' },
  { code: 'T2S1', label: 'Tractocamión con semirremolque, 3 ejes' },
  { code: 'T2S2', label: 'Tractocamión con semirremolque, 4 ejes' },
  { code: 'T2S3', label: 'Tractocamión con semirremolque, 5 ejes' },
  { code: 'T3S1', label: 'Tractocamión con semirremolque, 4 ejes' },
  { code: 'T3S2', label: 'Tractocamión con semirremolque, 5 ejes' },
  { code: 'T3S3', label: 'Tractocamión con semirremolque, 6 ejes' },
  { code: 'T2S1R2', label: 'Tractocamión, semirremolque y remolque' },
  { code: 'T2S2R2', label: 'Tractocamión, semirremolque y remolque' },
  { code: 'T3S1R2', label: 'Tractocamión, semirremolque y remolque' },
  { code: 'T3S1R3', label: 'Tractocamión, semirremolque y remolque' },
  { code: 'T3S2R2', label: 'Tractocamión, semirremolque y remolque' },
  { code: 'T3S2R3', label: 'Tractocamión, semirremolque y remolque' },
  { code: 'T3S2R4', label: 'Tractocamión, semirremolque y remolque' },
];

/** c_SubTipoRem → SubTipoRem. Solo si la unidad lleva remolque. */
export const SAT_SUBTIPO_REMOLQUE: SatCatalogItem[] = [
  { code: 'CTR001', label: 'Caballete' },
  { code: 'CTR002', label: 'Caja' },
  { code: 'CTR003', label: 'Caja abierta' },
  { code: 'CTR004', label: 'Caja cerrada' },
  { code: 'CTR005', label: 'Caja de recolección con cargador frontal' },
  { code: 'CTR006', label: 'Caja refrigerada' },
  { code: 'CTR007', label: 'Caja seca' },
  { code: 'CTR008', label: 'Caja transfer' },
  { code: 'CTR009', label: 'Cama baja o cuello de ganso' },
  { code: 'CTR010', label: 'Chasis portacontenedor' },
  { code: 'CTR011', label: 'Convencional de chasis' },
  { code: 'CTR012', label: 'Equipo especial' },
  { code: 'CTR013', label: 'Estacas' },
  { code: 'CTR014', label: 'Góndola madrina' },
  { code: 'CTR015', label: 'Grúa industrial' },
  { code: 'CTR016', label: 'Grúa' },
  { code: 'CTR017', label: 'Integral' },
  { code: 'CTR018', label: 'Jaula' },
  { code: 'CTR019', label: 'Media redila' },
  { code: 'CTR020', label: 'Pallet o celdillas' },
  { code: 'CTR021', label: 'Plataforma' },
  { code: 'CTR022', label: 'Plataforma con grúa' },
  { code: 'CTR023', label: 'Plataforma encortinada' },
  { code: 'CTR024', label: 'Redilas' },
  { code: 'CTR025', label: 'Refrigerador' },
  { code: 'CTR026', label: 'Revolvedora' },
  { code: 'CTR027', label: 'Semicaja' },
  { code: 'CTR028', label: 'Tanque' },
  { code: 'CTR029', label: 'Tolva' },
  { code: 'CTR031', label: 'Volteo' },
  { code: 'CTR032', label: 'Volteo desmontable' },
];

export function catalogOrphan(items: SatCatalogItem[], value: string | null | undefined): string {
  const code = (value ?? '').trim();
  if (!code || items.some((item) => item.code === code)) return '';
  return code;
}
