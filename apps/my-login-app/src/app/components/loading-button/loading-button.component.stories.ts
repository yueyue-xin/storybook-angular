import type { Meta, StoryObj } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { userEvent, within, expect } from '@storybook/test';
import { LoadingButtonComponent } from './loading-button.component';

const meta: Meta<LoadingButtonComponent> = {
  title: 'my-login-app/Components/LoadingButton',
  component: LoadingButtonComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A reusable button component with loading state, spinner animation, and customizable styling. Supports different button types and disabled states.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'The text displayed on the button when not loading',
      defaultValue: 'Submit'
    },
    loadingText: {
      control: 'text',
      description: 'The text displayed when the button is in loading state',
      defaultValue: 'Loading...'
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state (shows spinner)',
      defaultValue: false
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      defaultValue: false
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'The HTML button type attribute',
      defaultValue: 'button'
    },
    buttonClass: {
      control: 'text',
      description: 'CSS classes applied to the button',
      defaultValue: 'btn btn-primary btn-block'
    }
  },
  args: {
    clicked: action('clicked')
  }
};

export default meta;
type Story = StoryObj<LoadingButtonComponent>;

// Base Default Story
export const Default: Story = {
  args: {
    text: 'Submit',
    loadingText: 'Loading...',
    loading: false,
    disabled: false,
    type: 'button',
    buttonClass: 'btn btn-primary btn-block'
  }
};

// Button Interaction Stories
export const ButtonInteractions: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find the button element
    const button = canvas.getByRole('button');
    
    // Test button click
    await userEvent.click(button);
    await expect(button).toBeInTheDocument();
    
    // Verify button is not disabled initially
    await expect(button).not.toBeDisabled();
  }
};

export const AllButtonStates: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    // Test button click if not disabled
    if (button instanceof HTMLButtonElement && !button.disabled) {
      await userEvent.click(button);
      console.log('Clicked: Submit button');
    }
  }
};

// Loading State Stories
export const LoadingState: Story = {
  ...Default,
  args: {
    ...Default.args,
    loading: true
  }
};

export const LoadingWithCustomText: Story = {
  ...Default,
  args: {
    ...Default.args,
    loading: true,
    loadingText: 'Processing...'
  }
};

export const LoadingInteraction: Story = {
  ...Default,
  args: {
    ...Default.args,
    loading: true
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    // Button should be disabled when loading
    await expect(button).toBeDisabled();
    
    // Should show loading text
    await expect(canvas.getByText('Loading...')).toBeInTheDocument();
    
    // Should show spinner
    const spinner = canvasElement.querySelector('clr-spinner');
    await expect(spinner).toBeInTheDocument();
  }
};

// Disabled State Stories
export const DisabledState: Story = {
  ...Default,
  args: {
    ...Default.args,
    disabled: true
  }
};

export const DisabledInteraction: Story = {
  ...Default,
  args: {
    ...Default.args,
    disabled: true
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    // Button should be disabled
    await expect(button).toBeDisabled();
    
    // Click should not work
    await userEvent.click(button);
    // No action should be fired due to disabled state
  }
};

// Button Type Variants
export const SubmitButton: Story = {
  ...Default,
  args: {
    ...Default.args,
    text: 'Submit Form',
    type: 'submit'
  }
};

export const ResetButton: Story = {
  ...Default,
  args: {
    ...Default.args,
    text: 'Reset Form',
    type: 'reset',
    buttonClass: 'btn btn-outline btn-block'
  }
};

// Button Style Variants
export const PrimaryButton: Story = {
  ...Default,
  args: {
    ...Default.args,
    text: 'Primary Action',
    buttonClass: 'btn btn-primary btn-block'
  }
};

export const SecondaryButton: Story = {
  ...Default,
  args: {
    ...Default.args,
    text: 'Secondary Action',
    buttonClass: 'btn btn-outline btn-block'
  }
};

export const DangerButton: Story = {
  ...Default,
  args: {
    ...Default.args,
    text: 'Delete Item',
    buttonClass: 'btn btn-danger btn-block'
  }
};

export const SmallButton: Story = {
  ...Default,
  args: {
    ...Default.args,
    text: 'Small Button',
    buttonClass: 'btn btn-primary btn-sm'
  }
};

// Complex Interaction Flow
export const LoadingFlow: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    // Initial state - button should be enabled and show default text
    await expect(button).not.toBeDisabled();
    await expect(canvas.getByText('Submit')).toBeInTheDocument();
    
    // Click the button
    await userEvent.click(button);
    
    // Note: In a real scenario, the parent component would set loading=true
    // For this story, we're just testing the click interaction
  }
};

// Form Integration Stories
export const FormSubmitButton: Story = {
  ...Default,
  args: {
    ...Default.args,
    text: 'Create Account',
    type: 'submit'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    // Test form submission button
    await userEvent.click(button);
    await expect(button).toHaveAttribute('type', 'submit');
  }
};

// Error State Simulation
export const ErrorRecovery: Story = {
  ...Default,
  args: {
    ...Default.args,
    text: 'Retry',
    buttonClass: 'btn btn-outline btn-block'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    // Test retry button click
    await userEvent.click(button);
    await expect(canvas.getByText('Retry')).toBeInTheDocument();
  }
};


// Data-driven Stories
export const WithDifferentTexts: Story = {
  ...Default,
  args: {
    ...Default.args,
    text: 'Custom Action Text'
  }
};

export const WithLongText: Story = {
  ...Default,
  args: {
    ...Default.args,
    text: 'This is a very long button text that might wrap',
    loadingText: 'Processing your very important request...'
  }
};

// State Combinations
export const LoadingAndDisabled: Story = {
  ...Default,
  args: {
    ...Default.args,
    loading: true,
    disabled: true
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    // Should be disabled due to both loading and disabled flags
    await expect(button).toBeDisabled();
    await expect(canvas.getByText('Loading...')).toBeInTheDocument();
  }
};
