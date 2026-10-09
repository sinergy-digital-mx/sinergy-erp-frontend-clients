/** Camión de costado, apuntando a la derecha. `facingLeft` lo voltea. */
export function truckMarkerUrl(color = '#2563eb', facingLeft = false): string {
  const flip = facingLeft ? ' transform="translate(72,0) scale(-1,1)"' : '';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="40" viewBox="0 0 72 40">
    <ellipse cx="36" cy="35" rx="22" ry="3.2" fill="rgba(15,23,42,0.28)"/>
    <g${flip}>
      <rect x="6" y="10" width="38" height="18" rx="3" fill="${color}"/>
      <rect x="10" y="13" width="10" height="6" rx="1" fill="rgba(255,255,255,0.22)"/>
      <path d="M44 16h10.5c1.4 0 2.6.7 3.3 1.8L62 24v4H44V16z" fill="${color}"/>
      <path d="M48 17.5h8.2l3.2 5H48v-5z" fill="#dbeafe"/>
      <circle cx="18" cy="29" r="4.2" fill="#0f172a"/>
      <circle cx="18" cy="29" r="1.7" fill="#e2e8f0"/>
      <circle cx="52" cy="29" r="4.2" fill="#0f172a"/>
      <circle cx="52" cy="29" r="1.7" fill="#e2e8f0"/>
    </g>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function truckFacesLeft(heading: number | null | undefined): boolean {
  if (heading == null || !Number.isFinite(Number(heading))) return false;
  const normalized = ((Number(heading) % 360) + 360) % 360;
  return normalized > 180;
}

export function truckMarkerColor(speed: number | null | undefined, ignition: string | null | undefined): string {
  if (speed != null && speed > 1) return '#2563eb';
  const state = String(ignition ?? '').toLowerCase();
  if (state.includes('on') || state.includes('encend') || state === '1' || state === 'true') {
    return '#f59e0b';
  }
  return '#64748b';
}
