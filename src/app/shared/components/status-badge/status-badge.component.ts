import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BIDDING_STATUS } from '../../constants/bidding-types';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [ngClass]="getStatusClass()" class="px-2 py-1 rounded-full text-sm font-medium">
      {{ BIDDING_STATUS[status] }}
    </span>
  `
})
export class StatusBadgeComponent {
  @Input() status!: keyof typeof BIDDING_STATUS;
  BIDDING_STATUS = BIDDING_STATUS;

  getStatusClass(): string {
    const classes = {
      draft: 'bg-gray-100 text-gray-800',
      published: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return classes[this.status] || classes.draft;
  }
}