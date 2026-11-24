import { AssignedBranch } from '../../../core/services/auth.service';

/** Nombre de la sucursal, sin ciudad, con el texto original. */
export function posBranchName(branch: Pick<AssignedBranch, 'id' | 'code' | 'display_name'>): string {
  const fromDisplay = splitPosBranchDisplayName(branch.display_name).name.trim();
  return fromDisplay || branch.code?.trim() || branch.id || 'Sucursal';
}

/** Nombre de la sucursal, sin ciudad. Es el texto de la barra del POS. */
export function posBranchTitle(branch: Pick<AssignedBranch, 'id' | 'code' | 'display_name'>): string {
  return prettyPosBranchLabel(posBranchName(branch));
}

/** Ciudad, para el modal de sucursal. */
export function posBranchCity(branch: Pick<AssignedBranch, 'city' | 'display_name'>): string | null {
  if (branch.city?.trim()) {
    return prettyPosBranchLabel(branch.city);
  }
  const fromDisplay = splitPosBranchDisplayName(branch.display_name).city;
  return fromDisplay ? prettyPosBranchLabel(fromDisplay) : null;
}

/** Evita códigos en MAYÚSCULAS que se leen como texto gigante. */
export function prettyPosBranchLabel(raw: string): string {
  return raw.replace(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+/g, (word) => {
    if (word.length <= 2) {
      return word.toUpperCase();
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
}

export function splitPosBranchDisplayName(displayName?: string): { name: string; city: string | null } {
  const raw = displayName?.trim() ?? '';
  if (!raw) {
    return { name: '', city: null };
  }
  const parts = raw.split(/\s*[—–-]\s*/);
  if (parts.length < 2) {
    return { name: raw, city: null };
  }
  return { name: parts[0], city: parts.slice(1).join(' — ') };
}
