import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ClarityModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true
    }
  ],
  template: `
    <clr-input-container *ngIf="type !== 'password'">
      <label>{{ label }}</label>
      <input 
        clrInput 
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        [class.clr-error]="showError"
        (input)="onInput($event)"
        (blur)="onBlur()" />
      <clr-control-error *ngIf="showError && errors?.['required']">
        {{ label }} is required
      </clr-control-error>
      <clr-control-error *ngIf="showError && errors?.['minlength']">
        {{ label }} must be at least {{ errors?.['minlength']?.requiredLength }} characters
      </clr-control-error>
      <clr-control-error *ngIf="showError && errors?.['email']">
        Please enter a valid email address
      </clr-control-error>
    </clr-input-container>

    <clr-password-container *ngIf="type === 'password'">
      <label>{{ label }}</label>
      <input 
        clrPassword
        [placeholder]="placeholder"
        [value]="value"
        [class.clr-error]="showError"
        (input)="onInput($event)"
        (blur)="onBlur()" />
      <clr-control-error *ngIf="showError && errors?.['required']">
        {{ label }} is required
      </clr-control-error>
      <clr-control-error *ngIf="showError && errors?.['minlength']">
        {{ label }} must be at least {{ errors?.['minlength']?.requiredLength }} characters
      </clr-control-error>
    </clr-password-container>
  `,
  styles: [`
    :host {
      display: block;
      margin-bottom: 20px;
      margin-left: 30px;
    }
  `]
})
export class FormFieldComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() control: FormControl | null = null;

  value = '';
  touched = false;

  private onChange = (value: string) => {};
  private onTouched = () => {};

  get showError(): boolean {
    return this.touched && this.control ? this.control.invalid : false;
  }

  get errors() {
    return this.control?.errors;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.touched = true;
    this.onTouched();
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}