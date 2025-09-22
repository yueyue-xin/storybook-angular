import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';

@Component({
  selector: 'app-loading-button',
  standalone: true,
  imports: [CommonModule, ClarityModule],
  template: `
    <button 
      [type]="type"
      [class]="buttonClass"
      [disabled]="disabled || loading"
      (click)="onClick()">
      <clr-spinner *ngIf="loading" clrInline clrSmall>{{ loadingText }}</clr-spinner>
      <span *ngIf="!loading">{{ text }}</span>
    </button>
  `,
  styles: [`
    .btn-block {
      width: 100%;
      height: 44px;
      font-size: 16px;
      font-weight: 500;
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      
      &:hover:not(:disabled) {
        background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
      }
      
      &:disabled {
        background: #bdc3c7;
        cursor: not-allowed;
      }
    }
  `]
})
export class LoadingButtonComponent {
  @Input() text = 'Submit';
  @Input() loadingText = 'Loading...';
  @Input() loading = false;
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() buttonClass = 'btn btn-primary btn-block';
  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    if (!this.loading && !this.disabled) {
      this.clicked.emit();
    }
  }
}