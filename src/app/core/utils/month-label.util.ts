/** Primera letra del mes en mayúscula: "nov 26" queda "Nov 26". */
export function titledMonthLabel(label: string): string {
  const text = label.trim();
  if (!text) return label;
  return text.charAt(0).toLocaleUpperCase('es-MX') + text.slice(1);
}
