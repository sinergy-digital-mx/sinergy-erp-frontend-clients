const STORAGE_KEY = 'reporte-requerimiento-branches-v1';

export interface BranchVisibilityState {
  hiddenIds: string[];
  seenIds: string[];
}

export function isCedisBranch(name: string): boolean {
  return name.toLocaleLowerCase('es').includes('cedis');
}

export function labelBranches<T extends { id: string; name: string }>(
  branches: T[],
): Array<T & { label: string }> {
  const totals = new Map<string, number>();
  for (const branch of branches) {
    const key = normalize(branch.name);
    totals.set(key, (totals.get(key) ?? 0) + 1);
  }

  const seen = new Map<string, number>();
  return branches.map((branch) => {
    const key = normalize(branch.name);
    const index = (seen.get(key) ?? 0) + 1;
    seen.set(key, index);
    const repeated = (totals.get(key) ?? 0) > 1;
    return { ...branch, label: repeated ? `${branch.name} (${index})` : branch.name };
  });
}

/** CEDIS ocultos la primera vez. Lo que el usuario ya eligió se respeta. */
export function resolveHiddenBranchIds(
  branches: Array<{ id: string; name: string }>,
  stored: BranchVisibilityState | null,
): string[] {
  const seen = new Set(stored?.seenIds ?? []);
  const hidden = new Set(stored?.hiddenIds ?? []);
  const result: string[] = [];
  for (const branch of branches) {
    if (seen.has(branch.id)) {
      if (hidden.has(branch.id)) {
        result.push(branch.id);
      }
      continue;
    }
    if (isCedisBranch(branch.name)) {
      result.push(branch.id);
    }
  }
  return result;
}

export function readBranchVisibility(): BranchVisibilityState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as Partial<BranchVisibilityState>;
    if (!Array.isArray(parsed.hiddenIds) || !Array.isArray(parsed.seenIds)) {
      return null;
    }
    return {
      hiddenIds: parsed.hiddenIds.filter((id) => typeof id === 'string'),
      seenIds: parsed.seenIds.filter((id) => typeof id === 'string'),
    };
  } catch {
    return null;
  }
}

export function writeBranchVisibility(state: BranchVisibilityState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // La hoja sigue usable aunque el navegador no guarde la elección.
  }
}

function normalize(name: string): string {
  return name.trim().toLocaleLowerCase('es');
}
