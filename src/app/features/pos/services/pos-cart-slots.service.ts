import { Injectable, signal } from '@angular/core';

export const POS_CART_SLOT_COUNT = 3;
export type PosCartSlotId = 1 | 2 | 3;

/** Identidad de la línea. El precio se vuelve a tomar del catálogo. */
export interface PosCartSlotLine {
  productId: string;
  productUomId: string;
  quantity: number;
  priceListId?: string | null;
  productDiscountId?: string | null;
  priceDiscountPercentage?: number;
  /** Solo para el aviso si el producto ya no está. No se usa como precio. */
  productName?: string;
  productSku?: string;
  uomName?: string;
  /** Precio del documento, solo en memoria al llevar un folio. No se guarda. */
  documentUnitPrice?: number;
}

export interface PosCartSlotState {
  customerId: string | null;
  customerName: string;
  walkInName: string;
  walkInRfc: string;
  globalDiscountId: string | null;
  lines: PosCartSlotLine[];
}

export interface PosCartSlotsSnapshot {
  active: PosCartSlotId;
  slots: Record<PosCartSlotId, PosCartSlotState>;
}

const STORAGE_PREFIX = 'pos.cartSlots.v1';

function emptySlot(): PosCartSlotState {
  return {
    customerId: null,
    customerName: '',
    walkInName: '',
    walkInRfc: '',
    globalDiscountId: null,
    lines: [],
  };
}

function emptySnapshot(): PosCartSlotsSnapshot {
  return {
    active: 1,
    slots: { 1: emptySlot(), 2: emptySlot(), 3: emptySlot() },
  };
}

function isSlotId(value: unknown): value is PosCartSlotId {
  return value === 1 || value === 2 || value === 3;
}

@Injectable({ providedIn: 'root' })
export class PosCartSlotsService {
  readonly snapshot = signal<PosCartSlotsSnapshot>(emptySnapshot());
  private boundKey = '';

  bind(scopeKey: string): PosCartSlotsSnapshot {
    const snap = this.read(scopeKey);
    this.boundKey = scopeKey;
    this.snapshot.set(snap);
    return snap;
  }

  writeSlot(scopeKey: string, slot: PosCartSlotId, state: PosCartSlotState): void {
    const base = this.boundKey === scopeKey ? this.snapshot() : this.read(scopeKey);
    const next: PosCartSlotsSnapshot = {
      active: slot,
      slots: {
        1: slot === 1 ? state : base.slots[1],
        2: slot === 2 ? state : base.slots[2],
        3: slot === 3 ? state : base.slots[3],
      },
    };
    this.boundKey = scopeKey;
    this.snapshot.set(next);
    this.persist(scopeKey, next);
  }

  setActive(scopeKey: string, slot: PosCartSlotId): void {
    const base = this.boundKey === scopeKey ? this.snapshot() : this.read(scopeKey);
    const next: PosCartSlotsSnapshot = { ...base, active: slot };
    this.boundKey = scopeKey;
    this.snapshot.set(next);
    this.persist(scopeKey, next);
  }

  private read(scopeKey: string): PosCartSlotsSnapshot {
    try {
      const raw = localStorage.getItem(`${STORAGE_PREFIX}:${scopeKey}`);
      if (!raw) {
        return emptySnapshot();
      }
      const parsed = JSON.parse(raw) as Partial<PosCartSlotsSnapshot>;
      const active = isSlotId(parsed.active) ? parsed.active : 1;
      return {
        active,
        slots: {
          1: this.sanitizeSlot(parsed.slots?.[1]),
          2: this.sanitizeSlot(parsed.slots?.[2]),
          3: this.sanitizeSlot(parsed.slots?.[3]),
        },
      };
    } catch {
      return emptySnapshot();
    }
  }

  private persist(scopeKey: string, snap: PosCartSlotsSnapshot): void {
    try {
      const stored: PosCartSlotsSnapshot = {
        active: snap.active,
        slots: {
          1: this.withoutDocumentPrice(snap.slots[1]),
          2: this.withoutDocumentPrice(snap.slots[2]),
          3: this.withoutDocumentPrice(snap.slots[3]),
        },
      };
      localStorage.setItem(`${STORAGE_PREFIX}:${scopeKey}`, JSON.stringify(stored));
    } catch {
      /* cuota o modo privado */
    }
  }

  private withoutDocumentPrice(state: PosCartSlotState): PosCartSlotState {
    return {
      ...state,
      lines: state.lines.map((line) => ({
        productId: line.productId,
        productUomId: line.productUomId,
        quantity: line.quantity,
        priceListId: line.priceListId ?? null,
        productDiscountId: line.productDiscountId ?? null,
        priceDiscountPercentage: line.priceDiscountPercentage ?? 0,
        productName: line.productName,
        productSku: line.productSku,
        uomName: line.uomName,
      })),
    };
  }

  private sanitizeSlot(value: unknown): PosCartSlotState {
    if (!value || typeof value !== 'object') {
      return emptySlot();
    }
    const row = value as Partial<PosCartSlotState>;
    const lines = Array.isArray(row.lines) ? row.lines : [];
    return {
      customerId: row.customerId ? String(row.customerId) : null,
      customerName: String(row.customerName ?? ''),
      walkInName: String(row.walkInName ?? ''),
      walkInRfc: String(row.walkInRfc ?? ''),
      globalDiscountId: row.globalDiscountId ? String(row.globalDiscountId) : null,
      lines: lines
        .map((line) => this.sanitizeLine(line))
        .filter((line): line is PosCartSlotLine => line != null),
    };
  }

  private sanitizeLine(value: unknown): PosCartSlotLine | null {
    if (!value || typeof value !== 'object') {
      return null;
    }
    const line = value as Partial<PosCartSlotLine>;
    const productId = String(line.productId ?? '').trim();
    const productUomId = String(line.productUomId ?? '').trim();
    const quantity = Number(line.quantity);
    if (!productId || !productUomId || !Number.isFinite(quantity) || quantity <= 0) {
      return null;
    }
    return {
      productId,
      productUomId,
      quantity,
      priceListId: line.priceListId ? String(line.priceListId) : null,
      productDiscountId: line.productDiscountId ? String(line.productDiscountId) : null,
      priceDiscountPercentage: Number(line.priceDiscountPercentage ?? 0) || 0,
      productName: line.productName ? String(line.productName) : undefined,
      productSku: line.productSku ? String(line.productSku) : undefined,
      uomName: line.uomName ? String(line.uomName) : undefined,
    };
  }
}
