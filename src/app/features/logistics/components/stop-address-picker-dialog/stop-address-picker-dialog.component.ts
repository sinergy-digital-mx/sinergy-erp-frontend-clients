import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, X } from 'lucide-angular';
import { CustomerService } from '../../../../core/services/customer.service';
import { CustomerAddressDialogComponent } from '../../../customers/components/customer-address-dialog/customer-address-dialog.component';
import { CustomerAddress } from '../../../customers/models/customer-group.model';
import { ShippingCustomerAddress } from '../../models/shipping.model';

export interface StopAddressPickerData {
  customerId: string;
  customerName: string;
  selectedId?: number | string | null;
  addresses?: ShippingCustomerAddress[];
  /** En un viaje que ya salió solo se corrige el mapa. */
  canAssign?: boolean;
}

export interface StopAddressPickerResult {
  addressId?: number;
  locationChanged?: boolean;
}

interface PickerAddress extends ShippingCustomerAddress {
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

@Component({
  selector: 'app-stop-address-picker-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './stop-address-picker-dialog.component.html',
  styleUrl: './stop-address-picker-dialog.component.scss',
})
export class StopAddressPickerDialogComponent implements OnInit {
  readonly X = X;

  addresses = signal<PickerAddress[]>([]);
  loading = signal(false);
  selectedId = signal<number | null>(null);
  private locationChanged = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: StopAddressPickerData,
    private dialogRef: MatDialogRef<StopAddressPickerDialogComponent, StopAddressPickerResult | undefined>,
    private dialog: MatDialog,
    private customers: CustomerService,
  ) {}

  ngOnInit(): void {
    const initial = (this.data.addresses ?? [])
      .map((item) => normalizeStopAddress(item))
      .filter((item): item is PickerAddress => !!item);
    this.addresses.set(initial);
    this.selectedId.set(toAddressId(this.data.selectedId));
    this.reload();
  }

  reload(): void {
    this.loading.set(true);
    this.customers.getCustomerAddresses(this.data.customerId).subscribe({
      next: (raw) => {
        const list = unwrapAddresses(raw)
          .map((item) => normalizeStopAddress(item))
          .filter((item): item is PickerAddress => !!item);
        if (list.length) this.addresses.set(list);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  pick(id: number): void {
    this.selectedId.set(id);
  }

  canAssign(): boolean {
    return this.data.canAssign !== false;
  }

  useSelected(): void {
    const id = this.selectedId();
    if (id == null || !this.canAssign()) return;
    this.dialogRef.close({ addressId: id, locationChanged: this.locationChanged });
  }

  edit(address: PickerAddress): void {
    const ref = this.dialog.open(CustomerAddressDialogComponent, {
      width: '960px',
      maxWidth: '96vw',
      data: {
        customerId: this.data.customerId,
        defaultType: 'shipping',
        address: toCustomerAddress(address, this.data.customerId),
      },
    });
    ref.afterClosed().subscribe((saved) => {
      if (!saved) return;
      this.locationChanged = true;
      this.selectedId.set(address.id);
      this.reload();
    });
  }

  addNew(): void {
    const ref = this.dialog.open(CustomerAddressDialogComponent, {
      width: '960px',
      maxWidth: '96vw',
      data: {
        customerId: this.data.customerId,
        address: null,
        defaultType: 'shipping',
      },
    });
    ref.afterClosed().subscribe((created) => {
      const id = createdAddressId(created);
      if (id == null) {
        if (created) this.reload();
        return;
      }
      if (!this.canAssign()) {
        this.locationChanged = true;
        this.selectedId.set(id);
        this.reload();
        return;
      }
      this.dialogRef.close({ addressId: id, locationChanged: true });
    });
  }

  close(): void {
    this.dialogRef.close(this.locationChanged ? { locationChanged: true } : undefined);
  }

  typeLabel(address: PickerAddress): string {
    return address.type_label || addressTypeLabel(address.type);
  }
}

function toAddressId(value: number | string | null | undefined): number | null {
  if (value == null || value === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function createdAddressId(created: unknown): number | null {
  if (!created || created === true || typeof created !== 'object') return null;
  return toAddressId((created as { id?: number | string }).id);
}

function unwrapAddresses(raw: unknown): unknown[] {
  if (Array.isArray(raw)) return raw;
  if (!raw || typeof raw !== 'object') return [];
  const row = raw as Record<string, unknown>;
  const nested = row['data'] ?? row['addresses'] ?? row['items'];
  return Array.isArray(nested) ? nested : [];
}

function addressTypeLabel(type: string | null | undefined): string {
  const key = (type ?? '').toLowerCase();
  if (key === 'shipping' || key === 'delivery' || key === 'entrega') return 'Entrega';
  if (key === 'primary') return 'Principal';
  if (key === 'billing' || key === 'facturacion' || key === 'facturación') return 'Facturación';
  if (key === 'other' || key === 'otra') return 'Otra';
  return type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Dirección';
}

function toCustomerAddress(address: PickerAddress, customerId: string): CustomerAddress {
  return {
    id: String(address.id),
    customer_id: customerId,
    type: address.type || 'shipping',
    street_address: address.street_address || address.address_summary || '',
    city: address.city,
    state: address.state,
    postal_code: address.postal_code,
    country: address.country || 'México',
    is_primary: address.is_primary,
    latitude: address.latitude,
    longitude: address.longitude,
  };
}

function normalizeStopAddress(raw: unknown): PickerAddress | null {
  if (!raw || typeof raw !== 'object') return null;
  const row = raw as Record<string, unknown>;
  const id = toAddressId(row['id'] as number | string | null | undefined);
  if (id == null || Number(row['status']) === 0) return null;
  const street = String(row['street_address'] ?? row['address_summary'] ?? '').trim();
  const city = String(row['city'] ?? '').trim();
  const state = String(row['state'] ?? '').trim();
  const postal = String(row['postal_code'] ?? '').trim();
  const country = String(row['country'] ?? '').trim();
  const summary =
    String(row['address_summary'] ?? '').trim() || [street, city, state].filter(Boolean).join(', ');
  const latitude = row['latitude'] == null || row['latitude'] === '' ? null : Number(row['latitude']);
  const longitude = row['longitude'] == null || row['longitude'] === '' ? null : Number(row['longitude']);
  const hasCoords =
    latitude != null && longitude != null && Number.isFinite(latitude) && Number.isFinite(longitude);
  const gpsFlag = row['has_gps'];
  return {
    id,
    type: row['type'] == null ? null : String(row['type']),
    type_label: row['type_label'] == null ? undefined : String(row['type_label']),
    address_summary: summary || 'Sin calle',
    street_address: street,
    city,
    state,
    postal_code: postal,
    country: country || 'México',
    is_primary: !!row['is_primary'],
    has_gps: gpsFlag === 0 || gpsFlag === false ? false : gpsFlag === 1 || gpsFlag === true || hasCoords,
    latitude: hasCoords ? latitude : null,
    longitude: hasCoords ? longitude : null,
  };
}
