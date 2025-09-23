import type { Meta, StoryObj } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { userEvent, within, expect } from '@storybook/test';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from './form-field.component';

const meta: Meta<FormFieldComponent> = {
  title: 'my-login-app/Components/FormField',
  component: FormFieldComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A reusable form field component with validation support using Clarity UI. Implements ControlValueAccessor for seamless Angular forms integration. Supports text, email, and password field types with built-in validation error display.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label text displayed above the input field',
      defaultValue: ''
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown inside the input field',
      defaultValue: ''
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password'],
      description: 'The input field type which determines validation and styling',
      defaultValue: 'text'
    },
    control: {
      control: false,
      description: 'Angular FormControl instance for validation and value management'
    }
  },
  decorators: [
    (story) => ({
      template: `<div style="width: 400px; padding: 20px;">${story().template}</div>`,
      moduleMetadata: {
        imports: [ReactiveFormsModule]
      },
      props: story().props
    })
  ]
};

export default meta;
type Story = StoryObj<FormFieldComponent>;

// Base Default Story
export const Default: Story = {
  args: {
    label: 'Default Field',
    placeholder: 'Enter text...',
    type: 'text',
    control: new FormControl('')
  }
};

// Input Type Variants
export const TextField: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Full Name',
    placeholder: 'Enter your full name',
    type: 'text',
    control: new FormControl('')
  }
};

export const EmailField: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
    control: new FormControl('', [Validators.required, Validators.email])
  }
};

export const PasswordField: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    control: new FormControl('', [Validators.required, Validators.minLength(8)])
  }
};

// Input Interactions
export const InputInteractions: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Interactive Field',
    placeholder: 'Type something...',
    type: 'text',
    control: new FormControl('')
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find the text input
    const textInput = canvas.getByLabelText(/Interactive Field/i);
    if (textInput instanceof HTMLInputElement) {
      await userEvent.clear(textInput);
      await userEvent.type(textInput, 'Test input value');
      await expect(textInput).toHaveValue('Test input value');
    }
  }
};

export const EmailInputFlow: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Email',
    placeholder: 'Enter valid email',
    type: 'email',
    control: new FormControl('', [Validators.required, Validators.email])
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find email input
    const emailInput = canvas.getByLabelText(/Email/i);
    if (emailInput instanceof HTMLInputElement) {
      // Test valid email
      await userEvent.clear(emailInput);
      await userEvent.type(emailInput, 'test@example.com');
      await expect(emailInput).toHaveValue('test@example.com');
      
      // Test blur to trigger validation
      await userEvent.tab();
    }
  }
};

export const PasswordInputFlow: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Password',
    placeholder: 'Enter secure password',
    type: 'password',
    control: new FormControl('', [Validators.required, Validators.minLength(8)])
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find password input - should be in clr-password-container
    const passwordInput = canvasElement.querySelector('clr-password-container input[clrPassword]');
    if (passwordInput instanceof HTMLInputElement) {
      await userEvent.clear(passwordInput);
      await userEvent.type(passwordInput, 'securePassword123');
      await expect(passwordInput).toHaveValue('securePassword123');
    }
  }
};

// Validation States
export const RequiredValidation: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Required Field',
    placeholder: 'This field is required',
    type: 'text',
    control: new FormControl('', [Validators.required])
  }
};

export const EmailValidation: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Email Validation',
    placeholder: 'Enter valid email address',
    type: 'email',
    control: new FormControl('', [Validators.required, Validators.email])
  }
};

export const MinLengthValidation: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Password',
    placeholder: 'Minimum 8 characters',
    type: 'password',
    control: new FormControl('', [Validators.required, Validators.minLength(8)])
  }
};

// Form Validation Flow
export const FormValidation: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Validated Field',
    placeholder: 'Test validation...',
    type: 'text',
    control: new FormControl('', [Validators.required])
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find the input
    const input = canvas.getByLabelText(/Validated Field/i);
    if (input instanceof HTMLInputElement) {
      // Clear field and blur to trigger required validation
      await userEvent.clear(input);
      await userEvent.tab();
      
      // Check for validation error (should appear after blur)
      const errorMessage = canvas.queryByText(/is required/i);
      if (errorMessage) {
        await expect(errorMessage).toBeInTheDocument();
      }
      
      // Fix validation by adding text
      await userEvent.type(input, 'Valid input');
      await expect(input).toHaveValue('Valid input');
    }
  }
};

export const EmailValidationFlow: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Email Validation Test',
    placeholder: 'test@example.com',
    type: 'email',
    control: new FormControl('', [Validators.required, Validators.email])
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    const emailInput = canvas.getByLabelText(/Email Validation Test/i);
    if (emailInput instanceof HTMLInputElement) {
      // Test invalid email
      await userEvent.type(emailInput, 'invalid-email');
      await userEvent.tab();
      
      // Check for email validation error
      const emailError = canvas.queryByText(/valid email address/i);
      if (emailError) {
        await expect(emailError).toBeInTheDocument();
      }
      
      // Fix with valid email
      await userEvent.clear(emailInput);
      await userEvent.type(emailInput, 'valid@example.com');
      await expect(emailInput).toHaveValue('valid@example.com');
    }
  }
};

export const PasswordValidationFlow: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Password Validation',
    placeholder: 'Min 8 characters',
    type: 'password',
    control: new FormControl('', [Validators.required, Validators.minLength(8)])
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find password input in clr-password-container
    const passwordInput = canvasElement.querySelector('clr-password-container input');
    if (passwordInput instanceof HTMLInputElement) {
      // Test short password
      await userEvent.type(passwordInput, '123');
      await userEvent.tab();
      
      // Check for minlength error
      const lengthError = canvas.queryByText(/at least.*characters/i);
      if (lengthError) {
        await expect(lengthError).toBeInTheDocument();
      }
      
      // Fix with longer password
      await userEvent.clear(passwordInput);
      await userEvent.type(passwordInput, 'longpassword123');
      await expect(passwordInput).toHaveValue('longpassword123');
    }
  }
};

// Clarity Component Integration
export const ClarityComponentFlow: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Clarity Integration',
    placeholder: 'Testing Clarity components',
    type: 'text',
    control: new FormControl('', [Validators.required])
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify clr-input-container exists for non-password fields
    const inputContainer = canvasElement.querySelector('clr-input-container');
    await expect(inputContainer).toBeInTheDocument();
    
    // Verify clr-input directive on input
    const clrInput = canvasElement.querySelector('input[clrInput]');
    await expect(clrInput).toBeInTheDocument();
    
    // Test input interaction
    if (clrInput instanceof HTMLInputElement) {
      await userEvent.type(clrInput, 'Clarity test');
      await expect(clrInput).toHaveValue('Clarity test');
    }
  }
};

export const ClarityPasswordFlow: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Password Clarity',
    placeholder: 'Password with Clarity',
    type: 'password',
    control: new FormControl('', [Validators.required])
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify clr-password-container exists for password fields
    const passwordContainer = canvasElement.querySelector('clr-password-container');
    await expect(passwordContainer).toBeInTheDocument();
    
    // Verify clrPassword directive on input
    const clrPasswordInput = canvasElement.querySelector('input[clrPassword]');
    await expect(clrPasswordInput).toBeInTheDocument();
    
    // Test password input interaction
    if (clrPasswordInput instanceof HTMLInputElement) {
      await userEvent.type(clrPasswordInput, 'secretPassword');
      await expect(clrPasswordInput).toHaveValue('secretPassword');
    }
  }
};

// Error State Testing
export const ErrorStates: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Error Testing',
    placeholder: 'Will show errors',
    type: 'email',
    control: (() => {
      const control = new FormControl('', [Validators.required, Validators.email]);
      // Simulate touched and invalid state
      control.markAsTouched();
      control.setErrors({ required: true });
      return control;
    })()
  }
};

export const MultipleValidationErrors: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Multiple Errors',
    placeholder: 'Test multiple validation errors',
    type: 'password',
    control: (() => {
      const control = new FormControl('', [Validators.required, Validators.minLength(10)]);
      control.markAsTouched();
      control.setValue('123'); // Too short, triggers minlength error
      return control;
    })()
  }
};

// Form Integration Scenarios
export const InFormContext: Story = {
  ...Default,
  render: (args) => {
    const usernameControl = new FormControl('', [Validators.required]);
    const emailControl = new FormControl('', [Validators.required, Validators.email]);
    const passwordControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

    return {
      props: {
        ...args,
        usernameControl,
        emailControl,
        passwordControl,
      },
      template: `
        <form style="max-width: 400px;">
          <app-form-field 
            label="Username" 
            placeholder="Enter username" 
            type="text"
            [control]="usernameControl">
          </app-form-field>
          
          <app-form-field 
            label="Email" 
            placeholder="Enter email" 
            type="email"
            [control]="emailControl">
          </app-form-field>
          
          <app-form-field 
            label="Password" 
            placeholder="Enter password" 
            type="password"
            [control]="passwordControl">
          </app-form-field>
        </form>
      `,
      moduleMetadata: {
        imports: [ReactiveFormsModule],
      },
    }
  },
};

// Data-driven Stories
export const WithDifferentLabels: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Custom Label Text',
    placeholder: 'Custom placeholder'
  }
};

export const WithLongLabels: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: 'This is a very long label that demonstrates how the form field handles extended label text',
    placeholder: 'Enter your information here...',
    type: 'text',
    control: new FormControl('')
  }
};

// Complex Interaction Flow
export const CompleteFieldLifecycle: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Complete Lifecycle Test',
    placeholder: 'Test all interactions',
    type: 'email',
    control: new FormControl('', [Validators.required, Validators.email])
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Step 1: Verify initial state
    const emailInput = canvas.getByLabelText(/Complete Lifecycle Test/i);
    await expect(emailInput).toBeInTheDocument();
    await expect(emailInput).toHaveValue('');
    
    // Step 2: Test invalid input and validation
    if (emailInput instanceof HTMLInputElement) {
      await userEvent.type(emailInput, 'invalid');
      await userEvent.tab();
      
      // Check for validation error
      const validationError = canvas.queryByText(/valid email/i);
      if (validationError) {
        await expect(validationError).toBeInTheDocument();
      }
      
      // Step 3: Fix validation
      await userEvent.clear(emailInput);
      await userEvent.type(emailInput, 'test@example.com');
      await expect(emailInput).toHaveValue('test@example.com');
      
      // Step 4: Final blur to ensure no errors
      await userEvent.tab();
    }
  }
};
