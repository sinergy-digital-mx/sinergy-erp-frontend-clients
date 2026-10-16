import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowLeftRight, LucideAngularModule, Package, Truck } from 'lucide-angular';

@Component({
  selector: 'app-transfer-process',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './transfer-process.component.html',
  styleUrl: './transfer-process.component.scss',
})
export class TransferProcessComponent {
  readonly Package = Package;
  readonly ArrowLeftRight = ArrowLeftRight;
  readonly Truck = Truck;
}
