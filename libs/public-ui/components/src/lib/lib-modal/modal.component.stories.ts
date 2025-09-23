import type { Meta, StoryObj } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { userEvent, within, expect } from '@storybook/test';
import { ModalComponent } from './modal.component';

const meta: Meta<ModalComponent> = {
  title: 'public-ui/Components/Modal',
  component: ModalComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A reusable modal component using Clarity UI design system. Features customizable title, primary and secondary buttons with event handling, and content projection for flexible modal content. Supports open/close state management and button click actions.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The title displayed at the top of the modal',
      defaultValue: ''
    },
    primaryButtonText: {
      control: 'text',
      description: 'Text for the primary action button',
      defaultValue: 'Ok'
    },
    secondaryButtonText: {
      control: 'text',
      description: 'Text for the secondary action button',
      defaultValue: 'Cancel'
    },
    isOpen: {
      control: 'boolean',
      description: 'Controls whether the modal is open or closed',
      defaultValue: false
    },
    primaryClick: {
      action: 'primaryClick'
    },
    secondaryClick: {
      action: 'secondaryClick'
    }
  },
  args: {
    title: 'Sample Modal',
    primaryButtonText: 'Confirm',
    secondaryButtonText: 'Cancel',
    isOpen: true,
    primaryClick: action('primaryClick'),
    secondaryClick: action('secondaryClick'),
  },
  decorators: [
    (storyFn) => {
      const story = storyFn();
      console.log(story);
      return {
        ...story,
        template: `
          <lib-modal 
            [title]="title"
            [primaryButtonText]="primaryButtonText"
            [secondaryButtonText]="secondaryButtonText"
            [isOpen]="isOpen"
            (primaryClick)="primaryClick($event)"
            (secondaryClick)="secondaryClick($event)">
            <div class="default-modal-content">
              <p>This is the default projected content for the modal.</p>
              <p>You can customize this content in individual stories.</p>
            </div>
          </lib-modal>
        `,
        props: {
          ...story.props,
        },
      }
    }
  ]
};

export default meta;
type Story = StoryObj<ModalComponent>;

// Base Default Story
export const Default: Story = {
  args: {
    title: 'Default Modal',
    primaryButtonText: 'Ok',
    secondaryButtonText: 'Cancel',
    isOpen: true
  }
};

// Modal States
export const ClosedModal: Story = {
  args: {
    title: 'Closed Modal',
    primaryButtonText: 'Ok',
    secondaryButtonText: 'Cancel',
    isOpen: false
  }
};

export const OpenModal: Story = {
  args: {
    title: 'Open Modal',
    primaryButtonText: 'Ok',
    secondaryButtonText: 'Cancel',
    isOpen: true
  }
};

// Button Text Variants
export const ConfirmationModal: Story = {
  args: {
    title: 'Confirm Action',
    primaryButtonText: 'Confirm',
    secondaryButtonText: 'Cancel',
    isOpen: true
  }
};

export const SaveModal: Story = {
  args: {
    title: 'Save Changes',
    primaryButtonText: 'Save',
    secondaryButtonText: 'Discard',
    isOpen: true
  }
};

export const DeleteModal: Story = {
  args: {
    title: 'Delete Item',
    primaryButtonText: 'Delete',
    secondaryButtonText: 'Keep',
    isOpen: true
  }
};

export const SubmitModal: Story = {
  args: {
    title: 'Submit Form',
    primaryButtonText: 'Submit',
    secondaryButtonText: 'Cancel',
    isOpen: true
  }
};

// Content Projection Examples
export const WithSimpleContent: Story = {
  ...Default,
  render: (args) => ({
    props: args,
    template: `
      <lib-modal 
        [title]="title"
        [primaryButtonText]="primaryButtonText"
        [secondaryButtonText]="secondaryButtonText"
        [isOpen]="isOpen"
        (primaryClick)="primaryClick($event)"
        (secondaryClick)="secondaryClick($event)">
        <p>This is a simple text content inside the modal.</p>
      </lib-modal>
    `
  }),
  args: {
    title: 'Simple Content Modal',
    isOpen: true
  }
};

export const WithComplexContent: Story = {
  ...Default,
  render: (args) => ({
    props: args,
    template: `
      <lib-modal 
        [title]="title"
        [primaryButtonText]="primaryButtonText"
        [secondaryButtonText]="secondaryButtonText"
        [isOpen]="isOpen"
        (primaryClick)="primaryClick($event)"
        (secondaryClick)="secondaryClick($event)">
        <div>
          <h4>Complex Modal Content</h4>
          <p>This modal contains multiple elements:</p>
          <ul>
            <li>List item 1</li>
            <li>List item 2</li>
            <li>List item 3</li>
          </ul>
          <p><strong>Note:</strong> This is a complex content example.</p>
        </div>
      </lib-modal>
    `
  }),
  args: {
    title: 'Complex Content Modal',
    isOpen: true
  }
};

export const WithFormContent: Story = {
  ...Default,
  render: (args) => ({
    props: args,
    template: `
      <lib-modal 
        [title]="title"
        [primaryButtonText]="primaryButtonText"
        [secondaryButtonText]="secondaryButtonText"
        [isOpen]="isOpen"
        (primaryClick)="primaryClick($event)"
        (secondaryClick)="secondaryClick($event)">
        <form>
          <div style="margin-bottom: 1rem;">
            <label for="name">Name:</label>
            <input id="name" type="text" placeholder="Enter name" style="width: 100%; margin-top: 0.5rem;">
          </div>
          <div style="margin-bottom: 1rem;">
            <label for="email">Email:</label>
            <input id="email" type="email" placeholder="Enter email" style="width: 100%; margin-top: 0.5rem;">
          </div>
          <div style="margin-bottom: 1rem;">
            <label for="message">Message:</label>
            <textarea id="message" placeholder="Enter message" style="width: 100%; margin-top: 0.5rem; height: 80px;"></textarea>
          </div>
        </form>
      </lib-modal>
    `
  }),
  args: {
    title: 'Form Modal',
    primaryButtonText: 'Submit',
    secondaryButtonText: 'Cancel',
    isOpen: true
  }
};

// Button Interactions
export const ButtonInteractions: Story = {
  args: {
    title: 'Test Button Interactions',
    primaryButtonText: 'Primary Action',
    secondaryButtonText: 'Secondary Action',
    isOpen: true
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find primary and secondary buttons
    const primaryButton = canvas.getByRole('button', { name: /primary action/i });
    const secondaryButton = canvas.getByRole('button', { name: /secondary action/i });
    
    // Test primary button - should trigger primaryClick action
    if (primaryButton instanceof HTMLButtonElement) {
      await userEvent.click(primaryButton);
      await expect(primaryButton).toBeInTheDocument();
    }
    
    // Test secondary button - should trigger secondaryClick action
    if (secondaryButton instanceof HTMLButtonElement) {
      await userEvent.click(secondaryButton);
      await expect(secondaryButton).toBeInTheDocument();
    }
  }
};

// Clarity Component Flow
export const ClarityComponentFlow: Story = {
  args: {
    title: 'Clarity Modal Test',
    primaryButtonText: 'Clarity Primary',
    secondaryButtonText: 'Clarity Secondary',
    isOpen: true
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify Clarity modal is present
    const clarityModal = canvasElement.querySelector('clr-modal');
    await expect(clarityModal).toBeInTheDocument();
    
    // Verify modal is open
    await expect(clarityModal).toHaveAttribute('clrmodalopen', 'true');
    
    // Verify title is displayed
    await expect(canvas.getByText('Clarity Modal Test')).toBeInTheDocument();
    
    // Test button interactions with Clarity classes
    const primaryBtn = canvasElement.querySelector('.btn-primary');
    const secondaryBtn = canvasElement.querySelector('.btn-outline');
    
    if (primaryBtn instanceof HTMLButtonElement) {
      await userEvent.click(primaryBtn);
    }
    
    if (secondaryBtn instanceof HTMLButtonElement) {
      await userEvent.click(secondaryBtn);
    }
  }
};

// Modal Open/Close Flow
export const ModalToggleFlow: Story = {
  args: {
    title: 'Toggle Modal',
    primaryButtonText: 'Ok',
    secondaryButtonText: 'Cancel',
    isOpen: false
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Initially modal should be closed (not visible in DOM when closed)
    const clarityModal = canvasElement.querySelector('clr-modal');
    if (clarityModal) {
      // If modal exists, check if it's closed
      const isOpen = clarityModal.hasAttribute('clrmodalopen') && 
                     clarityModal.getAttribute('clrmodalopen') === 'true';
      await expect(isOpen).toBe(false);
    }
  }
};

export const ModalOpenFlow: Story = {
  args: {
    title: 'Open Modal Flow',
    primaryButtonText: 'Ok',
    secondaryButtonText: 'Cancel',
    isOpen: true
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Modal should be open and visible
    const clarityModal = canvasElement.querySelector('clr-modal');
    await expect(clarityModal).toBeInTheDocument();
    
    // Verify title is displayed
    await expect(canvas.getByText('Open Modal Flow')).toBeInTheDocument();
    
    // Verify buttons are present and clickable
    const primaryButton = canvas.getByRole('button', { name: /ok/i });
    const secondaryButton = canvas.getByRole('button', { name: /cancel/i });
    
    await expect(primaryButton).toBeInTheDocument();
    await expect(secondaryButton).toBeInTheDocument();
  }
};

// Content Projection Testing
export const ContentProjectionFlow: Story = {
  ...Default,
  render: (args) => ({
    props: args,
    template: `
      <lib-modal 
        [title]="title"
        [primaryButtonText]="primaryButtonText"
        [secondaryButtonText]="secondaryButtonText"
        [isOpen]="isOpen"
        (primaryClick)="primaryClick($event)"
        (secondaryClick)="secondaryClick($event)">
        <div id="projected-content">
          <p>This content is projected into the modal.</p>
          <button type="button" id="inner-button">Inner Button</button>
        </div>
      </lib-modal>
    `
  }),
  args: {
    title: 'Content Projection Test',
    isOpen: true
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify projected content is displayed
    await expect(canvas.getByText('This content is projected into the modal.')).toBeInTheDocument();
    
    // Verify projected button is interactive
    const innerButton = canvasElement.querySelector('#inner-button');
    if (innerButton instanceof HTMLButtonElement) {
      await userEvent.click(innerButton);
      await expect(innerButton).toBeInTheDocument();
    }
  }
};

// Input Interactions within Modal
export const InputInteractions: Story = {
  ...Default,
  render: (args) => ({
    props: args,
    template: `
      <lib-modal 
        [title]="title"
        [primaryButtonText]="primaryButtonText"
        [secondaryButtonText]="secondaryButtonText"
        [isOpen]="isOpen"
        (primaryClick)="primaryClick($event)"
        (secondaryClick)="secondaryClick($event)">
        <div>
          <input type="text" id="test-input" placeholder="Type here..." style="width: 100%; margin-bottom: 1rem;">
          <textarea id="test-textarea" placeholder="Enter message..." style="width: 100%; height: 60px;"></textarea>
        </div>
      </lib-modal>
    `
  }),
  args: {
    title: 'Input Testing Modal',
    isOpen: true
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test text input
    const textInput = canvasElement.querySelector('#test-input');
    if (textInput instanceof HTMLInputElement) {
      await userEvent.type(textInput, 'Test input value');
      await expect(textInput).toHaveValue('Test input value');
    }
    
    // Test textarea
    const textarea = canvasElement.querySelector('#test-textarea');
    if (textarea instanceof HTMLTextAreaElement) {
      await userEvent.type(textarea, 'Test textarea content');
      await expect(textarea).toHaveValue('Test textarea content');
    }
  }
};

// Long Content Testing
export const LongContentModal: Story = {
  ...Default,
  render: (args) => ({
    props: args,
    template: `
      <lib-modal 
        [title]="title"
        [primaryButtonText]="primaryButtonText"
        [secondaryButtonText]="secondaryButtonText"
        [isOpen]="isOpen"
        (primaryClick)="primaryClick($event)"
        (secondaryClick)="secondaryClick($event)">
        <div>
          <h4>Long Content Example</h4>
          <p>This modal contains a lot of content to test how the modal handles scrolling and layout with extensive text.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
          <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
        </div>
      </lib-modal>
    `
  }),
  args: {
    title: 'Long Content Modal',
    isOpen: true
  }
};

// Error/Warning Modal Scenarios
export const WarningModal: Story = {
  ...Default,
  render: (args) => ({
    props: args,
    template: `
      <lib-modal 
        [title]="title"
        [primaryButtonText]="primaryButtonText"
        [secondaryButtonText]="secondaryButtonText"
        [isOpen]="isOpen"
        (primaryClick)="primaryClick($event)"
        (secondaryClick)="secondaryClick($event)">
        <div style="color: #ff6b35;">
          <h4>⚠️ Warning</h4>
          <p>This action cannot be undone. Are you sure you want to proceed?</p>
        </div>
      </lib-modal>
    `
  }),
  args: {
    title: 'Warning',
    primaryButtonText: 'Proceed',
    secondaryButtonText: 'Cancel',
    isOpen: true
  }
};

export const ErrorModal: Story = {
  ...Default,
  render: (args) => ({
    props: args,
    template: `
      <lib-modal 
        [title]="title"
        [primaryButtonText]="primaryButtonText"
        [secondaryButtonText]="secondaryButtonText"
        [isOpen]="isOpen"
        (primaryClick)="primaryClick($event)"
        (secondaryClick)="secondaryClick($event)">
        <div style="color: #dc3545;">
          <h4>❌ Error</h4>
          <p>An error occurred while processing your request.</p>
          <p><strong>Error code:</strong> 500</p>
          <p><strong>Message:</strong> Internal server error</p>
        </div>
      </lib-modal>
    `
  }),
  args: {
    title: 'Error',
    primaryButtonText: 'Retry',
    secondaryButtonText: 'Close',
    isOpen: true
  }
};

// Success Modal
export const SuccessModal: Story = {
  ...Default,
  render: (args) => ({
    props: args,
    template: `
      <lib-modal 
        [title]="title"
        [primaryButtonText]="primaryButtonText"
        [secondaryButtonText]="secondaryButtonText"
        [isOpen]="isOpen"
        (primaryClick)="primaryClick($event)"
        (secondaryClick)="secondaryClick($event)">
        <div style="color: #28a745;">
          <h4>✅ Success</h4>
          <p>Your operation completed successfully!</p>
          <p>The changes have been saved and will take effect immediately.</p>
        </div>
      </lib-modal>
    `
  }),
  args: {
    title: 'Success',
    primaryButtonText: 'Continue',
    secondaryButtonText: 'Close',
    isOpen: true
  }
};

// Complete Modal Lifecycle
export const CompleteModalLifecycle: Story = {
  args: {
    title: 'Complete Lifecycle Test',
    primaryButtonText: 'Confirm',
    secondaryButtonText: 'Cancel',
    isOpen: true
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Step 1: Verify modal is open and visible
    const clarityModal = canvasElement.querySelector('clr-modal');
    await expect(clarityModal).toBeInTheDocument();
    
    // Step 2: Verify all modal elements
    await expect(canvas.getByText('Complete Lifecycle Test')).toBeInTheDocument();
    
    const primaryButton = canvas.getByRole('button', { name: /confirm/i });
    const secondaryButton = canvas.getByRole('button', { name: /cancel/i });
    
    await expect(primaryButton).toBeInTheDocument();
    await expect(secondaryButton).toBeInTheDocument();
    
    // Step 3: Test button interactions - should trigger actions
    if (primaryButton instanceof HTMLButtonElement) {
      await userEvent.click(primaryButton);
    }
    
    // Step 4: Verify button states and functionality
    await expect(primaryButton).toHaveClass('btn-primary');
    await expect(secondaryButton).toHaveClass('btn-outline');
    
    // Step 5: Test secondary button - should trigger action
    if (secondaryButton instanceof HTMLButtonElement) {
      await userEvent.click(secondaryButton);
    }
  }
};

// Modal with Dynamic Content
export const DynamicContentModal: Story = {
  ...Default,
  render: (args) => ({
    props: {
      ...args,
      currentTime: new Date().toLocaleTimeString()
    },
    template: `
      <lib-modal 
        [title]="title"
        [primaryButtonText]="primaryButtonText"
        [secondaryButtonText]="secondaryButtonText"
        [isOpen]="isOpen"
        (primaryClick)="primaryClick($event)"
        (secondaryClick)="secondaryClick($event)">
        <div>
          <p>Current time: {{ currentTime }}</p>
          <p>This modal demonstrates dynamic content rendering.</p>
        </div>
      </lib-modal>
    `
  }),
  args: {
    title: 'Dynamic Content',
    isOpen: true
  }
};
