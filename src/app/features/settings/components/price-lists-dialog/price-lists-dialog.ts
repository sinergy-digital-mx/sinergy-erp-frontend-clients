import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { ToastService } from '../../../../core/services/toast.service';
import { ToastType } from '../../../../core/models/toast.model';
import { ProductService } from '../../services/product.service';
import { PriceList } from '../../models/product.model';

@Component({
  selector: 'app-price-lists-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, SpinnerComponent],
  templateUrl: './price-lists-dialog.html',
  styleUrls: ['./price-lists-dialog.scss']
})
export class PriceListsDialogComponent implements OnInit {
  priceLists: any[] = [];
  loading = false;
  originalData: any = {};

  constructor(
    private productService: ProductService,
    private dialogRef: MatDialogRef<PriceListsDialogComponent>,
    private toast: ToastService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPriceLists();
  }

  loadPriceLists(): void {
    this.loading = true;
    this.cdr.detectChanges();
    this.productService.getPriceLists().subscribe({
      next: (lists) => {
        this.priceLists = lists.map(list => ({
          ...list,
          list_number: list.list_number ?? null,
          margin_percent: list.margin_percent ?? null,
          editing: false
        }));
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading price lists:', error);
        this.loading = false;
        this.cdr.detectChanges();
        this.showNotification('Error al cargar las listas de precios', 'error');
      }
    });
  }

  addNew(): void {
    const newList = {
      id: '',
      name: '',
      list_number: null,
      margin_percent: null,
      description: '',
      editing: true,
      isNew: true
    };
    this.priceLists.unshift(newList);
    this.originalData[0] = { ...newList };
  }

  edit(index: number): void {
    this.originalData[index] = { ...this.priceLists[index] };
    this.priceLists[index].editing = true;
  }

  cancel(index: number): void {
    if (this.priceLists[index].isNew) {
      this.priceLists.splice(index, 1);
    } else {
      this.priceLists[index] = { ...this.originalData[index], editing: false };
    }
    delete this.originalData[index];
  }

  save(index: number): void {
    const list = this.priceLists[index];

    if (!list.name || !list.name.trim()) {
      this.showNotification('El nombre es requerido', 'error');
      return;
    }

    const listNumber = this.parseListNumber(list.list_number);
    const margin = this.parseMargin(list.margin_percent);
    if (listNumber === 'invalid') {
      this.showNotification('El número debe ser un entero del 1 al 9999', 'error');
      return;
    }
    if (margin === 'invalid') {
      this.showNotification('El margen debe ser un porcentaje válido', 'error');
      return;
    }

    const data = {
      name: list.name.trim(),
      description: list.description?.trim() || '',
      list_number: listNumber,
      margin_percent: margin,
    };

    if (list.isNew) {
      // Crear nueva lista
      this.productService.createPriceList(data).subscribe({
        next: (newList) => {
          this.showNotification('Lista creada correctamente', 'success');
          this.loadPriceLists(); // Reload the full list
        },
        error: (error) => {
          console.error('Error creating price list:', error);
          const errorMessage = error.error?.message || 'Error al crear la lista';
          this.showNotification(errorMessage, 'error');
        }
      });
    } else {
      // Actualizar lista existente
      this.productService.updatePriceList(list.id, data).subscribe({
        next: (updatedList) => {
          this.showNotification('Lista actualizada correctamente', 'success');
          this.loadPriceLists(); // Reload the full list
        },
        error: (error) => {
          console.error('Error updating price list:', error);
          const errorMessage = error.error?.message || 'Error al actualizar la lista';
          this.showNotification(errorMessage, 'error');
        }
      });
    }
  }

  delete(index: number): void {
    const list = this.priceLists[index];
    
    if (!confirm(`¿Estás seguro de eliminar la lista "${list.name}"?`)) {
      return;
    }

    this.productService.deletePriceList(list.id).subscribe({
      next: () => {
        this.showNotification('Lista eliminada correctamente', 'success');
        this.loadPriceLists(); // Reload the full list
      },
      error: (error) => {
        console.error('Error deleting price list:', error);
        const errorMessage = error.error?.message || 'Error al eliminar la lista';
        this.showNotification(errorMessage, 'error');
      }
    });
  }

  marginLabel(list: { margin_percent?: number | string | null }): string {
    if (list.margin_percent == null || list.margin_percent === '') return '—';
    return `${Number(list.margin_percent)}%`;
  }

  private parseListNumber(value: unknown): number | null | 'invalid' {
    if (value == null || String(value).trim() === '') return null;
    const text = String(value).trim();
    if (!/^\d+$/.test(text)) return 'invalid';
    const number = Number(text);
    if (number < 1 || number > 9999) return 'invalid';
    return number;
  }

  private parseMargin(value: unknown): number | null | 'invalid' {
    if (value == null || String(value).trim() === '') return null;
    const text = String(value).trim().replace(',', '.');
    if (!/^-?\d+(\.\d{1,2})?$/.test(text)) return 'invalid';
    const number = Number(text);
    if (number < -100 || number > 999.99) return 'invalid';
    return number;
  }

  close(): void {
    this.dialogRef.close();
  }

  showNotification(message: string, type: ToastType | 'info' = 'success'): void {
    const toastType: ToastType = type === 'info' ? 'info' : type;
    this.toast.show(message, toastType);
  }
}
