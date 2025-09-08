import { Component } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from '../lib-modal/modal.component';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

@Component({
  selector: 'lib-data-grid',
  imports: [ClarityModule, CommonModule, ReactiveFormsModule, ModalComponent],
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.scss',
})
export class DataGridComponent {
  isModalOpen = false;
  addUserForm: FormGroup;
  nextId = 7;

  users: User[] = [
    { id: 1, name: 'John Smith', email: 'john.smith@mock.com', role: 'Admin', status: 'Online' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@mock.com', role: 'User', status: 'Online' },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@mock.com', role: 'User', status: 'Offline' },
    { id: 4, name: 'Alice Brown', email: 'alice.brown@mock.com', role: 'Admin', status: 'Online' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie.wilson@mock.com', role: 'User', status: 'Online' },
    { id: 6, name: 'Diana Prince', email: 'diana.prince@mock.com', role: 'Admin', status: 'Online' },
  ];

  constructor(private fb: FormBuilder) {
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['User', Validators.required]
    });
  }

  openAddModal() {
    this.isModalOpen = true;
    this.addUserForm.reset({ role: 'User' });
  }

  onModalPrimaryClick(buttonText: string) {
    if (this.addUserForm.valid) {
      const newUser: User = {
        id: this.nextId++,
        name: this.addUserForm.value.name,
        email: this.addUserForm.value.email,
        role: this.addUserForm.value.role,
        status: 'Online'
      };
      this.users.push(newUser);
      this.isModalOpen = false;
    }
  }

  onModalSecondaryClick(buttonText: string) {
    this.isModalOpen = false;
  }
}
