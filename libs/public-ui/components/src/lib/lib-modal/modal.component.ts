import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-modal',
  imports: [ClarityModule, CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() primaryButtonText: string = 'Ok';
  @Input() secondaryButtonText: string = 'Cancel';
  @Input() isOpen: boolean = false;

  @Output() primaryClick = new EventEmitter<string>();
  @Output() secondaryClick = new EventEmitter<string>();

  onPrimaryClick() {
    this.primaryClick.emit(this.primaryButtonText);
  }

  onSecondaryClick() {
    this.secondaryClick.emit(this.secondaryButtonText);
  }
}