import type { Meta, StoryObj } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { userEvent, within, expect } from '@storybook/test';
import { AlertComponent, AlertType } from './alert.component';

const meta: Meta<AlertComponent> = {
  title: 'my-login-app/Components/Alert',
  component: AlertComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A reusable alert component using Clarity UI design system. Supports different alert types (danger, warning, info, success) with optional close functionality.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: 'The alert message text to display',
      defaultValue: ''
    },
    type: {
      control: 'select',
      options: ['danger', 'warning', 'info', 'success'],
      description: 'The type of alert which determines the visual styling',
      defaultValue: 'danger'
    },
    closable: {
      control: 'boolean',
      description: 'Whether the alert can be closed by the user',
      defaultValue: true
    }
  },
  args: {
    closed: action('closed')
  }
};

export default meta;
type Story = StoryObj<AlertComponent>;

// Base Default Story
export const Default: Story = {
  args: {
    message: 'This is a default alert message',
    type: 'danger',
    closable: true
  }
};

// Alert Type Variants
export const DangerAlert: Story = {
  ...Default,
  args: {
    ...Default.args,
    message: 'Error: Something went wrong. Please try again.',
    type: 'danger'
  }
};

export const WarningAlert: Story = {
  ...Default,
  args: {
    ...Default.args,
    message: 'Warning: Please review your input before proceeding.',
    type: 'warning'
  }
};

export const InfoAlert: Story = {
  ...Default,
  args: {
    ...Default.args,
    message: 'Info: Your changes have been saved successfully.',
    type: 'info'
  }
};

export const SuccessAlert: Story = {
  ...Default,
  args: {
    ...Default.args,
    message: 'Success: Operation completed successfully!',
    type: 'success'
  }
};

// Closable State Variants
export const NonClosableAlert: Story = {
  ...Default,
  args: {
    ...Default.args,
    message: 'This alert cannot be closed by the user',
    closable: false
  }
};

export const ClosableAlert: Story = {
  ...Default,
  args: {
    ...Default.args,
    message: 'This alert can be closed by clicking the X button',
    closable: true
  }
};

// Clarity Component Interactions
export const ClarityComponentFlow: Story = {
  ...Default,
  args: {
    ...Default.args,
    message: 'Click the close button to dismiss this alert',
    closable: true
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify alert is visible
    const alertElement = canvasElement.querySelector('clr-alert');
    await expect(alertElement).toBeInTheDocument();
    
    // Verify message is displayed
    await expect(canvas.getByText('Click the close button to dismiss this alert')).toBeInTheDocument();
    
    // Find and click close button if closable
    const closeButton = canvasElement.querySelector('clr-alert button[aria-label="Close"]');
    if (closeButton instanceof HTMLButtonElement) {
      await userEvent.click(closeButton);
    }
  }
};

export const CloseInteraction: Story = {
  ...Default,
  args: {
    ...Default.args,
    message: 'Test closing this alert',
    closable: true
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Alert should be visible initially
    const alertText = canvas.getByText('Test closing this alert');
    await expect(alertText).toBeInTheDocument();
    
    // Find close button
    const closeButton = canvasElement.querySelector('clr-alert .close');
    if (closeButton instanceof HTMLButtonElement) {
      await userEvent.click(closeButton);
      // Note: In real scenario, the message would be cleared and alert hidden
    }
  }
};

// Message Content Variants
export const ShortMessage: Story = {
  ...Default,
  args: {
    ...Default.args,
    message: 'Short alert',
    type: 'info'
  }
};

export const LongMessage: Story = {
  ...Default,
  args: {
    ...Default.args,
    message: 'This is a very long alert message that demonstrates how the alert component handles extended content. It should wrap properly and maintain good readability even with multiple lines of text.',
    type: 'warning'
  }
};

export const EmptyMessage: Story = {
  ...Default,
  args: {
    ...Default.args,
    message: '',
    type: 'info'
  },
  play: async ({ canvasElement }) => {
    // Alert should not be visible when message is empty
    const alertElement = canvasElement.querySelector('clr-alert');
    await expect(alertElement).not.toBeInTheDocument();
  }
};

// Form Validation Scenarios
export const ValidationError: Story = {
  ...Default,
  args: {
    ...Default.args,
    message: 'Please fill in all required fields.',
    type: 'danger',
    closable: true
  }
};

export const ValidationSuccess: Story = {
  ...Default,
  args: {
    ...Default.args,
    message: 'Form submitted successfully!',
    type: 'success',
    closable: true
  }
};

// System Messages
export const NetworkError: Story = {
  ...Default,
  args: {
    ...Default.args,
    message: 'Network connection failed. Please check your internet connection.',
    type: 'danger',
    closable: false
  }
};

export const MaintenanceNotice: Story = {
  ...Default,
  args: {
    ...Default.args,
    message: 'System maintenance scheduled for tonight from 10 PM to 2 AM.',
    type: 'info',
    closable: true
  }
};

// State Combinations
export const DangerNonClosable: Story = {
  ...Default,
  args: {
    ...Default.args,
    message: 'Critical error that requires immediate attention',
    type: 'danger',
    closable: false
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify alert is visible
    await expect(canvas.getByText('Critical error that requires immediate attention')).toBeInTheDocument();
    
    // Verify no close button exists
    const closeButton = canvasElement.querySelector('clr-alert button[aria-label="Close"]');
    await expect(closeButton).not.toBeInTheDocument();
  }
};

export const SuccessClosable: Story = {
  ...Default,
  args: {
    ...Default.args,
    message: 'Data saved successfully. You can dismiss this notification.',
    type: 'success',
    closable: true
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify success message
    await expect(canvas.getByText('Data saved successfully. You can dismiss this notification.')).toBeInTheDocument();
    
    // Verify close button exists
    const closeButton = canvasElement.querySelector('clr-alert .close');
    await expect(closeButton).toBeInTheDocument();
  }
};

// Interactive Flow Testing
export const AlertLifecycle: Story = {
  ...Default,
  args: {
    ...Default.args,
    message: 'This alert demonstrates the complete lifecycle',
    type: 'info',
    closable: true
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Step 1: Verify alert appears
    const alertElement = canvasElement.querySelector('clr-alert');
    await expect(alertElement).toBeInTheDocument();
    await expect(alertElement).toHaveAttribute('clralerttype', 'info');
    
    // Step 2: Verify message content
    await expect(canvas.getByText('This alert demonstrates the complete lifecycle')).toBeInTheDocument();
    
    // Step 3: Verify closable state
    const closeButton = canvasElement.querySelector('clr-alert .close, clr-alert button[aria-label="Close"]');
    await expect(closeButton).toBeInTheDocument();
    
    // Step 4: Test close interaction
    if (closeButton instanceof HTMLButtonElement) {
      await userEvent.click(closeButton);
    }
  }
};

// Data-driven Stories
export const WithDifferentTypes: Story = {
  ...Default,
  args: {
    ...Default.args,
    message: 'Custom message content'
  }
};

export const AllAlertTypes: Story = {
  ...Default,
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; width: 500px;">
        <app-alert message="Danger alert message" type="danger" [closable]="true"></app-alert>
        <app-alert message="Warning alert message" type="warning" [closable]="true"></app-alert>
        <app-alert message="Info alert message" type="info" [closable]="true"></app-alert>
        <app-alert message="Success alert message" type="success" [closable]="true"></app-alert>
      </div>
    `
  })
};

// Error Recovery Scenarios
export const RetryAction: Story = {
  ...Default,
  args: {
    ...Default.args,
    message: 'Operation failed. Please try again.',
    type: 'danger',
    closable: true
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test error alert display
    await expect(canvas.getByText('Operation failed. Please try again.')).toBeInTheDocument();
    
    // Test close functionality for retry scenario
    const closeButton = canvasElement.querySelector('clr-alert .close');
    if (closeButton instanceof HTMLButtonElement) {
      await userEvent.click(closeButton);
    }
  }
};

// Complex Interaction Flow
export const NotificationFlow: Story = {
  ...Default,
  args: {
    ...Default.args,
    message: 'Your action was successful',
    type: 'success',
    closable: true
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify notification appears
    const successAlert = canvasElement.querySelector('clr-alert[clralerttype="success"]');
    await expect(successAlert).toBeInTheDocument();
    
    // Verify alert text
    await expect(canvas.getByText('Your action was successful')).toBeInTheDocument();
    
    // Test user acknowledgment (close)
    const closeButton = canvasElement.querySelector('clr-alert .close');
    if (closeButton instanceof HTMLButtonElement) {
      await userEvent.click(closeButton);
      // In real app, this would trigger the closed event
    }
  }
};
