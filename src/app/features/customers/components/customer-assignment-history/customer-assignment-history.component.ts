import { Component, Input, OnChanges, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentHistoryChange, AssignmentHistoryEntry } from '../../models/customer-group.model';
import {
  assignmentHistoryChangeLabel,
  assignmentHistoryChangeValue,
  assignmentHistoryChanges,
  formatAssignmentOccurredAt,
} from '../../utils/customer-registration.util';

@Component({
  selector: 'app-customer-assignment-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-assignment-history.component.html',
  styleUrl: './customer-assignment-history.component.scss',
})
export class CustomerAssignmentHistoryComponent implements OnChanges {
  @Input({ required: true }) entries: AssignmentHistoryEntry[] = [];

  sectionOpen = signal(true);
  private expandedIds = signal<Set<string>>(new Set());

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['entries']) {
      const first = this.entries[0];
      this.expandedIds.set(first ? new Set([this.entryKey(first, 0)]) : new Set());
    }
  }

  toggleSection(): void {
    this.sectionOpen.update((open) => !open);
  }

  toggleEntry(entry: AssignmentHistoryEntry, index: number): void {
    const id = this.entryKey(entry, index);
    this.expandedIds.update((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  isEntryOpen(entry: AssignmentHistoryEntry, index: number): boolean {
    return this.expandedIds().has(this.entryKey(entry, index));
  }

  entryKey(entry: AssignmentHistoryEntry, index: number): string {
    return entry.id || `idx-${index}`;
  }

  entryTitle(entry: AssignmentHistoryEntry): string {
    return (entry.title || entry.type_label || 'Cambio de asignación').trim();
  }

  entryDate(entry: AssignmentHistoryEntry): string | null {
    const formatted = formatAssignmentOccurredAt(entry.occurred_at);
    return formatted === '—' ? null : formatted;
  }

  entryActor(entry: AssignmentHistoryEntry): string | null {
    const name = (entry.actor_name ?? '').trim();
    return name && name !== '—' ? name : null;
  }

  entryChanges(entry: AssignmentHistoryEntry): AssignmentHistoryChange[] {
    return assignmentHistoryChanges(entry);
  }

  changeLabel(change: AssignmentHistoryChange): string {
    return assignmentHistoryChangeLabel(change);
  }

  changeValue(value?: string | null): string {
    return assignmentHistoryChangeValue(value);
  }
}
