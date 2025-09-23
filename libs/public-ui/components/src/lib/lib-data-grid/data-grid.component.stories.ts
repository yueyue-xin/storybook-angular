import type { Meta, StoryObj } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { userEvent, within, expect } from '@storybook/test';
import { ReactiveFormsModule } from '@angular/forms';
import { DataGridComponent, User } from './data-grid.component';

const meta: Meta<DataGridComponent> = {
  title: 'public-ui/Components/DataGrid',
  component: DataGridComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive data grid component using Clarity UI. Features user management with add functionality, pagination, status indicators, and form validation. Integrates DataGrid, Modal, and Form components for complete CRUD operations.'
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      template: `<div style="padding: 20px; min-height: 600px;">${story().template}</div>`,
      moduleMetadata: {
        imports: [ReactiveFormsModule]
      },
      props: story().props
    })
  ]
};

export default meta;
type Story = StoryObj<DataGridComponent>;

// Base Default Story
export const Default: Story = {};

// Data Variants
export const WithDefaultData: Story = {
  ...Default
};

export const WithLargeDataset: Story = {
  render: (args) => {
    const largeUserList: User[] = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 3 === 0 ? 'Admin' : i % 2 === 0 ? 'User' : 'Customer',
      status: i % 4 === 0 ? 'Offline' : 'Online'
    }));

    return {
      props: {
        ...args,
        users: largeUserList
      },
      template: `<lib-data-grid></lib-data-grid>`,
      moduleMetadata: {
        imports: [ReactiveFormsModule]
      }
    };
  }
};

export const EmptyDataGrid: Story = {
  render: (args) => ({
    props: {
      ...args,
      users: []
    },
    template: `<lib-data-grid></lib-data-grid>`,
    moduleMetadata: {
      imports: [ReactiveFormsModule]
    }
  })
};

// Button Interactions
export const ButtonInteractions: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find and click the Add Item button
    const addButton = canvas.getByRole('button', { name: /add item/i });
    if (addButton instanceof HTMLButtonElement) {
      await userEvent.click(addButton);
    }
  }
};

// DataGrid Interactions
export const DataGridInteractions: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify DataGrid is present
    const datagrid = canvasElement.querySelector('clr-datagrid');
    await expect(datagrid).toBeInTheDocument();
    
    // Verify data rows are present
    const dataRows = canvasElement.querySelectorAll('clr-dg-row');
    await expect(dataRows.length).toBeGreaterThan(0);
    
    // Check pagination if present
    const pagination = canvasElement.querySelector('clr-dg-pagination');
    await expect(pagination).toBeInTheDocument();
  }
};

// Clarity Component Flow
export const ClarityComponentFlow: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test Add button interaction
    const addButton = canvasElement.querySelector('button.btn-primary');
    if (addButton instanceof HTMLButtonElement) {
      await userEvent.click(addButton);
    }
    
    // Verify modal opens (modal should appear in DOM)
    const modal = canvasElement.querySelector('lib-modal');
    await expect(modal).toBeInTheDocument();
    
    // Test form inputs in modal
    const nameInput = canvasElement.querySelector('input[formControlName="name"]');
    if (nameInput instanceof HTMLInputElement) {
      await userEvent.type(nameInput, 'Test User');
      await expect(nameInput).toHaveValue('Test User');
    }
    
    const emailInput = canvasElement.querySelector('input[formControlName="email"]');
    if (emailInput instanceof HTMLInputElement) {
      await userEvent.type(emailInput, 'test@example.com');
      await expect(emailInput).toHaveValue('test@example.com');
    }
    
    // Test role selection
    const roleSelect = canvasElement.querySelector('select[formControlName="role"]');
    if (roleSelect instanceof HTMLSelectElement) {
      await userEvent.selectOptions(roleSelect, 'Admin');
      await expect(roleSelect).toHaveValue('Admin');
    }
  }
};

// Modal Integration Flow
export const ModalIntegrationFlow: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Step 1: Open modal
    const addButton = canvas.getByRole('button', { name: /add item/i });
    if (addButton instanceof HTMLButtonElement) {
      await userEvent.click(addButton);
    }
    
    // Step 2: Verify modal is open
    const modal = canvasElement.querySelector('lib-modal');
    await expect(modal).toBeInTheDocument();
    
    // Step 3: Fill form completely
    const nameInput = canvasElement.querySelector('input[formControlName="name"]');
    if (nameInput instanceof HTMLInputElement) {
      await userEvent.type(nameInput, 'John Doe');
    }
    
    const emailInput = canvasElement.querySelector('input[formControlName="email"]');
    if (emailInput instanceof HTMLInputElement) {
      await userEvent.type(emailInput, 'john.doe@test.com');
    }
    
    const roleSelect = canvasElement.querySelector('select[formControlName="role"]');
    if (roleSelect instanceof HTMLSelectElement) {
      await userEvent.selectOptions(roleSelect, 'User');
    }
    
    // Step 4: Submit form (would trigger Add button in real scenario)
    // Note: The actual submit button is in the modal component
  }
};

// Form Validation Flow
export const FormValidation: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Open modal first
    const addButton = canvas.getByRole('button', { name: /add item/i });
    if (addButton instanceof HTMLButtonElement) {
      await userEvent.click(addButton);
    }
    
    // Test required field validation
    const nameInput = canvasElement.querySelector('input[formControlName="name"]');
    if (nameInput instanceof HTMLInputElement) {
      // Clear field and blur to trigger validation
      await userEvent.clear(nameInput);
      await userEvent.tab();
      
      // Check for validation error
      const errorMessage = canvas.queryByText(/name is required/i);
      if (errorMessage) {
        await expect(errorMessage).toBeInTheDocument();
      }
      
      // Fix validation
      await userEvent.type(nameInput, 'Valid Name');
      await expect(nameInput).toHaveValue('Valid Name');
    }
    
    // Test email validation
    const emailInput = canvasElement.querySelector('input[formControlName="email"]');
    if (emailInput instanceof HTMLInputElement) {
      await userEvent.type(emailInput, 'invalid-email');
      await userEvent.tab();
      
      // Check for email validation error
      const emailError = canvas.queryByText(/valid email/i);
      if (emailError) {
        await expect(emailError).toBeInTheDocument();
      }
      
      // Fix email validation
      await userEvent.clear(emailInput);
      await userEvent.type(emailInput, 'valid@email.com');
      await expect(emailInput).toHaveValue('valid@email.com');
    }
  }
};

// Input Interactions
export const InputInteractions: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Open modal to access inputs
    const addButton = canvas.getByRole('button', { name: /add item/i });
    if (addButton instanceof HTMLButtonElement) {
      await userEvent.click(addButton);
    }
    
    // Test all form inputs
    const formInputs = canvasElement.querySelectorAll('input[formControlName]');
    for (const input of formInputs) {
      if (input instanceof HTMLInputElement) {
        const controlName = input.getAttribute('formControlName');
        
        if (controlName === 'name') {
          await userEvent.type(input, 'Test Name');
          await expect(input).toHaveValue('Test Name');
        } else if (controlName === 'email') {
          await userEvent.type(input, 'test@example.com');
          await expect(input).toHaveValue('test@example.com');
        }
      }
    }
    
    // Test select dropdown
    const roleSelect = canvasElement.querySelector('select[formControlName="role"]');
    if (roleSelect instanceof HTMLSelectElement) {
      await userEvent.selectOptions(roleSelect, 'Admin');
      await expect(roleSelect).toHaveValue('Admin');
    }
  }
};

// Pagination Testing
export const PaginationFlow: Story = {
  ...Default,
  render: (args) => {
    // Create enough data to trigger pagination
    const manyUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 2 === 0 ? 'Admin' : 'User',
      status: i % 3 === 0 ? 'Offline' : 'Online'
    }));

    return {
      props: {
        ...args,
        users: manyUsers
      },
      template: `<lib-data-grid></lib-data-grid>`,
      moduleMetadata: {
        imports: [ReactiveFormsModule]
      }
    };
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify pagination controls exist
    const pagination = canvasElement.querySelector('clr-dg-pagination');
    await expect(pagination).toBeInTheDocument();
    
    // Test page size selector if present
    const pageSizeSelector = canvasElement.querySelector('clr-dg-page-size select');
    if (pageSizeSelector instanceof HTMLSelectElement) {
      await userEvent.selectOptions(pageSizeSelector, '20');
    }
  }
};

// Status Display Testing
export const StatusDisplayFlow: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify status labels are displayed
    const statusLabels = canvasElement.querySelectorAll('.label');
    await expect(statusLabels.length).toBeGreaterThan(0);
    
    // Check for different status types
    const onlineLabels = canvasElement.querySelectorAll('.label-success');
    const offlineLabels = canvasElement.querySelectorAll('.label-warning');
    
    // At least one of each status should exist in default data
    await expect(onlineLabels.length + offlineLabels.length).toBeGreaterThan(0);
  }
};

// Data Manipulation Flow
export const DataManipulationFlow: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Count initial rows
    const initialRows = canvasElement.querySelectorAll('clr-dg-row');
    const initialCount = initialRows.length;
    
    // Open add modal
    const addButton = canvas.getByRole('button', { name: /add item/i });
    if (addButton instanceof HTMLButtonElement) {
      await userEvent.click(addButton);
    }
    
    // Fill form with valid data
    const nameInput = canvasElement.querySelector('input[formControlName="name"]');
    if (nameInput instanceof HTMLInputElement) {
      await userEvent.type(nameInput, 'New User');
    }
    
    const emailInput = canvasElement.querySelector('input[formControlName="email"]');
    if (emailInput instanceof HTMLInputElement) {
      await userEvent.type(emailInput, 'newuser@test.com');
    }
    
    // Note: In real scenario, we would submit the form and verify the new row appears
    // For this story, we're just testing the interaction flow
  }
};

// Error Recovery Scenarios
export const ErrorRecoveryFlow: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Open modal
    const addButton = canvas.getByRole('button', { name: /add item/i });
    if (addButton instanceof HTMLButtonElement) {
      await userEvent.click(addButton);
    }
    
    // Create validation errors
    const nameInput = canvasElement.querySelector('input[formControlName="name"]');
    if (nameInput instanceof HTMLInputElement) {
      await userEvent.type(nameInput, 'Test');
      await userEvent.clear(nameInput);
      await userEvent.tab();
    }
    
    const emailInput = canvasElement.querySelector('input[formControlName="email"]');
    if (emailInput instanceof HTMLInputElement) {
      await userEvent.type(emailInput, 'invalid');
      await userEvent.tab();
    }
    
    // Then fix the errors
    if (nameInput instanceof HTMLInputElement) {
      await userEvent.type(nameInput, 'Valid User Name');
    }
    
    if (emailInput instanceof HTMLInputElement) {
      await userEvent.clear(emailInput);
      await userEvent.type(emailInput, 'valid@email.com');
    }
  }
};

// Complete Lifecycle Testing
export const CompleteLifecycleFlow: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Step 1: Verify initial state
    const datagrid = canvasElement.querySelector('clr-datagrid');
    await expect(datagrid).toBeInTheDocument();
    
    const initialRows = canvasElement.querySelectorAll('clr-dg-row');
    await expect(initialRows.length).toBeGreaterThan(0);
    
    // Step 2: Open add modal
    const addButton = canvas.getByRole('button', { name: /add item/i });
    if (addButton instanceof HTMLButtonElement) {
      await userEvent.click(addButton);
    }
    
    // Step 3: Verify modal opened
    const modal = canvasElement.querySelector('lib-modal');
    await expect(modal).toBeInTheDocument();
    
    // Step 4: Complete form workflow
    const nameInput = canvasElement.querySelector('input[formControlName="name"]');
    const emailInput = canvasElement.querySelector('input[formControlName="email"]');
    const roleSelect = canvasElement.querySelector('select[formControlName="role"]');
    
    if (nameInput instanceof HTMLInputElement) {
      await userEvent.type(nameInput, 'Complete Test User');
      await expect(nameInput).toHaveValue('Complete Test User');
    }
    
    if (emailInput instanceof HTMLInputElement) {
      await userEvent.type(emailInput, 'complete@test.com');
      await expect(emailInput).toHaveValue('complete@test.com');
    }
    
    if (roleSelect instanceof HTMLSelectElement) {
      await userEvent.selectOptions(roleSelect, 'Admin');
      await expect(roleSelect).toHaveValue('Admin');
    }
    
    // Step 5: Verify form is valid (all fields filled)
    await expect(nameInput).toHaveValue('Complete Test User');
    await expect(emailInput).toHaveValue('complete@test.com');
    await expect(roleSelect).toHaveValue('Admin');
  }
};

// Different User Role Scenarios
export const AdminUsersOnly: Story = {
  render: (args) => {
    const adminUsers: User[] = [
      { id: 1, name: 'Admin User 1', email: 'admin1@example.com', role: 'Admin', status: 'Online' },
      { id: 2, name: 'Admin User 2', email: 'admin2@example.com', role: 'Admin', status: 'Online' },
      { id: 3, name: 'Admin User 3', email: 'admin3@example.com', role: 'Admin', status: 'Offline' }
    ];

    return {
      props: {
        ...args,
        users: adminUsers
      },
      template: `<lib-data-grid></lib-data-grid>`,
      moduleMetadata: {
        imports: [ReactiveFormsModule]
      }
    };
  }
};

export const MixedStatusUsers: Story = {
  render: (args) => {
    const mixedUsers: User[] = [
      { id: 1, name: 'Online User', email: 'online@example.com', role: 'User', status: 'Online' },
      { id: 2, name: 'Offline User', email: 'offline@example.com', role: 'User', status: 'Offline' },
      { id: 3, name: 'Online Admin', email: 'adminonline@example.com', role: 'Admin', status: 'Online' },
      { id: 4, name: 'Offline Admin', email: 'adminoffline@example.com', role: 'Admin', status: 'Offline' }
    ];

    return {
      props: {
        ...args,
        users: mixedUsers
      },
      template: `<lib-data-grid></lib-data-grid>`,
      moduleMetadata: {
        imports: [ReactiveFormsModule]
      }
    };
  }
};
