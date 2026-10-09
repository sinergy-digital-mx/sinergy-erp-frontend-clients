import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, ArrowRight } from 'lucide-angular';
import { ShippingListItem } from '../../models/shipping.model';
import { buildTripCard } from '../../utils/trip-card.util';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.scss',
})
export class TripCardComponent {
  readonly ArrowRight = ArrowRight;

  @Input({ required: true }) shipping!: ShippingListItem;
  @Output() selected = new EventEmitter<ShippingListItem>();

  get card() {
    return buildTripCard(this.shipping);
  }

  open(): void {
    this.selected.emit(this.shipping);
  }
}
