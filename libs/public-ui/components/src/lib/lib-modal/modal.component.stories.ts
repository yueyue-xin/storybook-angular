import type { Meta, StoryObj } from '@storybook/angular';
import { ModalComponent } from './modal.component';
import { action } from '@storybook/addon-actions';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';

const meta: Meta<ModalComponent> = {
  title: 'Public UI/Modal',
  component: ModalComponent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Title displayed in the modal header',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    primaryButtonText: {
      description: 'Text for the primary button',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Ok' },
      },
    },
    secondaryButtonText: {
      description: 'Text for the secondary button',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Cancel' },
      },
    },
    isOpen: {
      description: 'Controls whether the modal is open or closed',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    primaryClick: {
      description: 'Event emitted when primary button is clicked',
      action: 'primaryClick',
      table: {
        type: { summary: 'EventEmitter<string>' },
      },
    },
    secondaryClick: {
      description: 'Event emitted when secondary button is clicked',
      action: 'secondaryClick',
      table: {
        type: { summary: 'EventEmitter<string>' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ModalComponent>;

export const Default: Story = {
  args: {
    title: 'Confirmation',
    primaryButtonText: 'Ok',
    secondaryButtonText: 'Cancel',
    isOpen: true,
    primaryClick: action('primary-clicked'),
    secondaryClick: action('secondary-clicked'),
  },
  render: (args) => ({
    props: {
      ...args,
      primaryClick: action('primary-clicked'),
      secondaryClick: action('secondary-clicked'),
    },
    moduleMetadata: {
      imports: [ModalComponent],
    },
    template: `
      <lib-modal 
        [title]="title"
        [primaryButtonText]="primaryButtonText"
        [secondaryButtonText]="secondaryButtonText"
        [isOpen]="isOpen"
        (primaryClick)="primaryClick($event)"
        (secondaryClick)="secondaryClick($event)">
        <p>This is the modal content. You can put any content here using ng-content projection.</p>
        <p>Click the buttons to see the action events in the Actions panel.</p>
      </lib-modal>
    `,
  }),
};

export const WithForm: Story = {
  args: {
    title: 'Add New Item',
    primaryButtonText: 'Add',
    secondaryButtonText: 'Cancel',
    isOpen: true,
    primaryClick: action('primary-clicked'),
    secondaryClick: action('secondary-clicked'),
  },
  render: (args) => ({
    props: {
      ...args,
      primaryClick: action('primary-clicked'),
      secondaryClick: action('secondary-clicked'),
    },
    moduleMetadata: {
      imports: [ClarityModule, CommonModule, ModalComponent],
    },
    template: `
      <lib-modal 
        [title]="title"
        [primaryButtonText]="primaryButtonText"
        [secondaryButtonText]="secondaryButtonText"
        [isOpen]="isOpen"
        (primaryClick)="primaryClick($event)"
        (secondaryClick)="secondaryClick($event)">
        <form clrForm>
          <clr-input-container>
            <label>Name</label>
            <input clrInput placeholder="Enter name" />
          </clr-input-container>
          <clr-input-container>
            <label>Email</label>
            <input clrInput type="email" placeholder="Enter email" />
          </clr-input-container>
          <clr-select-container>
            <label>Role</label>
            <select clrSelect>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </clr-select-container>
        </form>
      </lib-modal>
    `,
  }),
};

export const CloudAutoMationPage: Story = {
  ...Default,
  parameters: {
    layoutSpacing: 'cloud-auto'
  },
}