import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'app-carta-porte-truck-help-dialog',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './carta-porte-truck-help-dialog.component.html',
  styleUrl: './carta-porte-truck-help-dialog.component.scss',
})
export class CartaPorteTruckHelpDialogComponent {
  readonly X = X;

  constructor(private dialogRef: MatDialogRef<CartaPorteTruckHelpDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
