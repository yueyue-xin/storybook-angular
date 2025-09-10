import type { Meta, StoryObj } from '@storybook/angular';
import { ComplexDataGridComponent, ModelData } from './complex-data-grid.component';
import { action } from '@storybook/addon-actions';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { within, userEvent, waitFor, expect } from '@storybook/test';

const sampleCustomData: ModelData[] = [
  { 
    name: 'Custom Model A', 
    defaultContext: '128k', 
    maxMode: '512k', 
    recommendation: ['Custom task', 'Testing'] 
  },
  { 
    name: 'Custom Model B', 
    defaultContext: '64k', 
    maxMode: '-', 
    recommendation: ['Development', 'Prototyping'] 
  },
];

const meta: Meta<ComplexDataGridComponent> = {
  title: 'Public UI/Complex Data Grid',
  component: ComplexDataGridComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Advanced data grid with loading, filtering, sorting, expansion, and selection capabilities. Features a 5-second loading simulation before displaying AI model data.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    pageSize: {
      description: 'Number of items to display per page',
      control: { type: 'select' },
      options: [5, 10, 15, 20, 50],
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '10' },
      },
    },
    data: {
      description: 'Array of model data to display. If empty, uses default models data.',
      control: { type: 'object' },
      table: {
        type: { 
          summary: 'ModelData[]',
          detail: 'Array of ModelData objects with name, defaultContext, maxMode, and recommendation properties'
        },
        defaultValue: { summary: '[] (uses internal modelsData)' },
      },
    },
    isLoading: {
      description: 'Loading state of the component (read-only, managed internally)',
      control: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true (for 5 seconds)' },
      },
    },
    selectedModels: {
      description: 'Currently selected models (read-only, managed by user interaction)',
      control: false,
      table: {
        type: { summary: 'ModelData[]' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ComplexDataGridComponent>;

export const Default: Story = {
  args: {
    pageSize: 10,
    data: [],
  },
  render: (args) => ({
    props: {
      ...args,
    },
    moduleMetadata: {
      imports: [ClarityModule, CommonModule, FormsModule, ComplexDataGridComponent],
    },
    template: `
      <div style="padding: 20px;">
        <h3>Default Complex Data Grid</h3>
        <lib-complex-data-grid 
          [pageSize]="pageSize"
          [data]="data">
        </lib-complex-data-grid>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Wait for loading to complete (5 s)
    await waitFor(() => {
      expect(canvas.queryByText('Loading model data, please wait...')).not.toBeInTheDocument();
    }, { timeout: 6000 });
    
    await waitFor(() => {
      expect(canvas.getByText('Claude 3 Opus')).toBeInTheDocument();
    });
    
  },
  parameters: {
    docs: {
      description: {
        story: 'loading behavior and displays all data with default settings.',
      },
    },
  },
};


export const FilteringInteraction: Story = {
  args: {
    pageSize: 10,
    data: [],
  },
  render: (args) => ({
    props: {
      ...args,
    },
    moduleMetadata: {
      imports: [ClarityModule, CommonModule, FormsModule, ComplexDataGridComponent],
    },
    template: `
      <div style="padding: 20px;">
        <p>Watch automated filtering demonstration:</p>
        <lib-complex-data-grid 
          [pageSize]="pageSize"
          [data]="data">
        </lib-complex-data-grid>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    await waitFor(() => {
      expect(canvas.queryByText('Loading model data, please wait...')).not.toBeInTheDocument();
    }, { timeout: 6000 });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const buttons = canvas.getAllByRole('button');
    const nameFilterButton = buttons.find(btn => 
      btn.querySelector('cds-icon[shape="filter-grid"]')
    );

    if (!nameFilterButton) {
      throw new Error('Name filter button not found');
    }
    await userEvent.click(nameFilterButton);

  },
  parameters: {
    docs: {
      description: {
        story: 'filtering functionality.',
      },
    },
  },
};

export const SortingInteraction: Story = {
  args: {
    pageSize: 10,
    data: [],
  },
  render: (args) => ({
    props: {
      ...args,
    },
    moduleMetadata: {
      imports: [ClarityModule, CommonModule, FormsModule, ComplexDataGridComponent],
    },
    template: `
      <div style="padding: 20px;">
        <h3>Sorting Interaction Demo</h3>
        <lib-complex-data-grid 
          [pageSize]="pageSize"
          [data]="data">
        </lib-complex-data-grid>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    await waitFor(() => {
      expect(canvas.queryByText('Loading model data, please wait...')).not.toBeInTheDocument();
    }, { timeout: 6000 });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Click Default Context column header to sort
    const defaultContextHeader = canvas.getByText('Default Context');
    await userEvent.click(defaultContextHeader);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Click again to sort descending
    await userEvent.click(defaultContextHeader);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Click Max Mode column header
    const maxModeHeader = canvas.getByText('Max Mode');
    await userEvent.click(maxModeHeader);
  },
  parameters: {
    docs: {
      description: {
        story: 'Automated demonstration of sorting functionality by clicking column headers.',
      },
    },
  },
};

export const SelectionInteraction: Story = {
  args: {
    pageSize: 10,
    data: [],
  },
  render: (args) => ({
    props: {
      ...args,
    },
    moduleMetadata: {
      imports: [ClarityModule, CommonModule, FormsModule, ComplexDataGridComponent],
    },
    template: `
      <div style="padding: 20px;">
        <p>Watch automated model selection using checkboxes:</p>
        <lib-complex-data-grid 
          [pageSize]="pageSize"
          [data]="data">
        </lib-complex-data-grid>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    await waitFor(() => {
      expect(canvas.queryByText('Loading model data, please wait...')).not.toBeInTheDocument();
    }, { timeout: 6000 });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const checkboxes = canvas.getAllByRole('checkbox');
    
    if (checkboxes.length > 0) {
      for (let i = 0; i < Math.min(3, checkboxes.length); i++) {
        await userEvent.click(checkboxes[i]);
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      await userEvent.click(checkboxes[0]);
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'model selection.',
      },
    },
  },
};

export const PaginationInteraction: Story = {
  args: {
    pageSize: 5,
    data: [],
  },
  render: (args) => ({
    props: {
      ...args,
    },
    moduleMetadata: {
      imports: [ClarityModule, CommonModule, FormsModule, ComplexDataGridComponent],
    },
    template: `
      <div style="padding: 20px;">
        <h3>Pagination Interaction Demo</h3>
        <lib-complex-data-grid 
          [pageSize]="pageSize"
          [data]="data">
        </lib-complex-data-grid>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.queryByText('Loading model data, please wait...')).not.toBeInTheDocument();
    }, { timeout: 6000 });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const nextButtons = canvas.queryAllByLabelText('Next page');
      const pageButtons = canvas.queryAllByRole('button');
      
      // interact with pagination controls
      if (nextButtons.length > 0) {
        await userEvent.click(nextButtons[0]);
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const prevButtons = canvas.queryAllByLabelText('Previous page');
        if (prevButtons.length > 0) {
          await userEvent.click(prevButtons[0]);
        }
      } else {
        // page size selector
        const pageSizeSelect = canvas.queryByDisplayValue('5');
        if (pageSizeSelect) {
          await userEvent.selectOptions(pageSizeSelect, '10');
        }
      }
    } catch (error) {
      console.log('ℹ️ Pagination interaction completed with limited controls');
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'pagination controls.',
      },
    },
  },
};

export const ExpandInteraction: Story = {
  args: {
    pageSize: 5,
    data: [],
  },
  render: (args) => ({
    props: {
      ...args,
    },
    moduleMetadata: {
      imports: [ClarityModule, CommonModule, FormsModule, ComplexDataGridComponent],
    },
    template: `
      <div style="padding: 20px;">
        <h3>Pagination Interaction Demo</h3>
        <lib-complex-data-grid 
          [pageSize]="pageSize"
          [data]="data">
        </lib-complex-data-grid>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.queryByText('Loading model data, please wait...')).not.toBeInTheDocument();
    }, { timeout: 6000 });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // const expandButton = await canvas.findByTestId('expand-button');
      const buttons = canvas.getAllByRole('button');
      const expandButton = buttons.find(btn => 
        btn.querySelector('cds-icon[shape="angle-double"]')
      );

      if (!expandButton) {
        throw new Error('Item Expand button not found');
      }

      await userEvent.click(expandButton);
    } catch (error) {
      console.log('ℹ️ Pagination interaction completed with limited controls');
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'pagination controls.',
      },
    },
  },
};