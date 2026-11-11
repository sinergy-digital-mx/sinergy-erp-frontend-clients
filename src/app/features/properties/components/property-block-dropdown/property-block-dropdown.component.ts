import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { SelectComponent } from '../../../../core/components/select/select.component';

@Component({
  selector: 'app-property-block-dropdown',
  standalone: true,
  imports: [CommonModule, SelectComponent],
  template: `
    <app-select
      [config]="selectConfig"
      (changeOption)="onBlockChange($event)">
    </app-select>
  `,
})
export class PropertyBlockDropdownComponent implements OnChanges {
  @Input() blocks: string[] = [];
  @Input() selectedBlock: string | null = null;
  @Output() blockSelect = new EventEmitter<{ block: string | null }>();

  private readonly blockControl = new FormControl<string | null>(null);

  selectConfig = this.buildConfig();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['blocks'] || changes['selectedBlock']) {
      this.blockControl.setValue(this.selectedBlock, { emitEvent: false });
      this.selectConfig = this.buildConfig();
    }
  }

  onBlockChange(event: { value?: string | null }): void {
    const block = event?.value?.trim() || null;
    this.blockSelect.emit({ block });
  }

  private buildConfig() {
    const options = [...this.blocks];
    if (this.selectedBlock && !options.includes(this.selectedBlock)) {
      options.push(this.selectedBlock);
    }
    return {
      placeholder: 'Manzana',
      data: options.map((block) => ({ value: block, label: `Manzana ${block}` })),
      value: 'value',
      option: 'label',
      form_control: this.blockControl,
      loading: false,
      all: true,
      all_message: 'Todas las manzanas',
    };
  }
}
