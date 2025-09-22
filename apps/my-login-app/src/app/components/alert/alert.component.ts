import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';

export type AlertType = 'danger' | 'warning' | 'info' | 'success';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule, ClarityModule],
  template: `
    <clr-alert 
      *ngIf="message" 
      [clrAlertType]="type" 
      [clrAlertClosable]="closable"
      (clrAlertClosedChange)="onClose()">
      <clr-alert-item>
        <span class="alert-text">{{ message }}</span>
      </clr-alert-item>
    </clr-alert>
  `
})
export class AlertComponent {
  @Input() message = '';
  @Input() type: AlertType = 'danger';
  @Input() closable = true;
  @Output() closed = new EventEmitter<void>();

  onClose(): void {
    this.message = '';
    this.closed.emit();
  }
}