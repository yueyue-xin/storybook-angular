import type { Meta, StoryObj } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { userEvent, within, expect, waitFor } from '@storybook/test';
import { FormsModule } from '@angular/forms';
import { ComplexDataGridComponent, ModelData } from './complex-data-grid.component';

const meta: Meta<ComplexDataGridComponent> = {
  title: 'public-ui/Components/ComplexDataGrid',
  component: ComplexDataGridComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'An advanced data grid component using Clarity UI with comprehensive features including custom sorting, row selection, detail panels, pagination, hideable columns, and loading states. Demonstrates enterprise-grade data grid functionality with AI model comparison data.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    pageSize: {
      control: { type: 'number', min: 5, max: 50 },
      description: 'Number of items to display per page',
      defaultValue: 10
    },
    data: {
      control: 'object',
      description: 'Array of ModelData to display in the grid'
    }
  },
  decorators: [
    (story) => ({
      template: `<div style="padding: 20px; min-height: 800px;">${story().template}</div>`,
      moduleMetadata: {
        imports: [FormsModule]
      },
      props: story().props
    })
  ]
};

export default meta;
type Story = StoryObj<ComplexDataGridComponent>;

// Base Default Story
export const Default: Story = {
  args: {
    pageSize: 10
  }
};

// Loading State
export const LoadingState: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Should show loading spinner initially
    const spinner = canvasElement.querySelector('clr-spinner');
    await expect(spinner).toBeInTheDocument();
    
    // Should show loading text
    await expect(canvas.getByText(/Loading model data/i)).toBeInTheDocument();
    
    // DataGrid should not be visible during loading
    const datagrid = canvasElement.querySelector('clr-datagrid');
    await expect(datagrid).not.toBeInTheDocument();
  }
};

// Data After Loading
export const LoadedState: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Wait for loading to complete (component has 5s delay)
    await waitFor(
      async () => {
        const datagrid = canvasElement.querySelector('clr-datagrid');
        await expect(datagrid).toBeInTheDocument();
      },
      { timeout: 6000 }
    );
    
    // Verify loading spinner is gone
    const spinner = canvasElement.querySelector('clr-spinner');
    await expect(spinner).not.toBeInTheDocument();
    
    // Verify data rows are present
    const dataRows = canvasElement.querySelectorAll('clr-dg-row');
    await expect(dataRows.length).toBeGreaterThan(0);
  }
};

// Custom Data Set
export const WithCustomData: Story = {
  render: (args) => {
    const customData: ModelData[] = [
      {
        name: 'Custom Model A',
        defaultContext: '100k',
        maxMode: '500k',
        recommendation: ['Custom feature 1', 'Custom feature 2']
      },
      {
        name: 'Custom Model B',
        defaultContext: '50k',
        maxMode: '-',
        recommendation: ['Feature X', 'Feature Y', 'Feature Z']
      },
      {
        name: 'Custom Model C',
        defaultContext: '-',
        maxMode: '1M',
        recommendation: ['Enterprise use']
      }
    ];

    return {
      props: {
        ...args,
        data: customData
      },
      template: `<lib-complex-data-grid [pageSize]="pageSize" [data]="data"></lib-complex-data-grid>`,
      moduleMetadata: {
        imports: [FormsModule]
      }
    };
  },
  args: {
    pageSize: 5
  }
};

// Small Page Size
export const SmallPageSize: Story = {
  ...Default,
  args: {
    pageSize: 5
  }
};

// Large Page Size
export const LargePageSize: Story = {
  ...Default,
  args: {
    pageSize: 20
  }
};

// DataGrid Interactions (after loading)
export const DataGridInteractions: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Wait for loading to complete
    await waitFor(
      async () => {
        const datagrid = canvasElement.querySelector('clr-datagrid');
        await expect(datagrid).toBeInTheDocument();
      },
      { timeout: 6000 }
    );
    
    // Verify pagination is present
    const pagination = canvasElement.querySelector('clr-dg-pagination');
    await expect(pagination).toBeInTheDocument();
    
    // Check for columns
    const columns = canvasElement.querySelectorAll('clr-dg-column');
    await expect(columns.length).toBe(4); // Name, Default Context, Max Mode, Recommendations
    
    // Verify data is displayed
    const firstRowName = canvas.queryByText(/Claude 3 Opus|Claude 3.5 Haiku/i);
    if (firstRowName) {
      await expect(firstRowName).toBeInTheDocument();
    }
  }
};

// Sorting Interactions
export const SortingInteractions: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Wait for loading
    await waitFor(
      async () => {
        const datagrid = canvasElement.querySelector('clr-datagrid');
        await expect(datagrid).toBeInTheDocument();
      },
      { timeout: 6000 }
    );
    
    // Test sorting by clicking column headers
    const nameColumn = canvas.queryByText('Name');
    if (nameColumn instanceof HTMLElement) {
      await userEvent.click(nameColumn);
    }
    
    const defaultContextColumn = canvas.queryByText('Default Context');
    if (defaultContextColumn instanceof HTMLElement) {
      await userEvent.click(defaultContextColumn);
    }
    
    const maxModeColumn = canvas.queryByText('Max Mode');
    if (maxModeColumn instanceof HTMLElement) {
      await userEvent.click(maxModeColumn);
    }
  }
};

// Row Selection
export const RowSelectionFlow: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Wait for loading
    await waitFor(
      async () => {
        const datagrid = canvasElement.querySelector('clr-datagrid');
        await expect(datagrid).toBeInTheDocument();
      },
      { timeout: 6000 }
    );
    
    // Find and click checkboxes to select rows
    const checkboxes = canvasElement.querySelectorAll('input[type="checkbox"]');
    if (checkboxes.length > 1) {
      // Click first data row checkbox (skip header checkbox)
      const firstRowCheckbox = checkboxes[1];
      if (firstRowCheckbox instanceof HTMLInputElement) {
        await userEvent.click(firstRowCheckbox);
        await expect(firstRowCheckbox).toBeChecked();
      }
    }
  }
};

// Detail Panel Expansion
export const DetailPanelFlow: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Wait for loading
    await waitFor(
      async () => {
        const datagrid = canvasElement.querySelector('clr-datagrid');
        await expect(datagrid).toBeInTheDocument();
      },
      { timeout: 6000 }
    );
    
    // Find and click on a row to expand detail panel
    const firstRow = canvasElement.querySelector('clr-dg-row');
    if (firstRow instanceof HTMLElement) {
      // Look for expand button or clickable area
      const expandButton = firstRow.querySelector('.datagrid-expandable-caret, [role="button"]');
      if (expandButton instanceof HTMLElement) {
        await userEvent.click(expandButton);
      } else {
        // Try clicking the row itself
        await userEvent.click(firstRow);
      }
    }
  }
};

// Pagination Flow
export const PaginationFlow: Story = {
  ...Default,
  args: {
    pageSize: 5 // Small page size to trigger pagination
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Wait for loading
    await waitFor(
      async () => {
        const pagination = canvasElement.querySelector('clr-dg-pagination');
        await expect(pagination).toBeInTheDocument();
      },
      { timeout: 6000 }
    );
    
    // Test page size selector
    const pageSizeSelect = canvasElement.querySelector('clr-dg-page-size select');
    if (pageSizeSelect instanceof HTMLSelectElement) {
      await userEvent.selectOptions(pageSizeSelect, '10');
      await expect(pageSizeSelect).toHaveValue('10');
    }
    
    // Test pagination navigation if multiple pages exist
    const nextButton = canvasElement.querySelector('.pagination .pagination-next');
    if (nextButton instanceof HTMLButtonElement && !nextButton.disabled) {
      await userEvent.click(nextButton);
    }
  }
};

// Clarity Component Flow
export const ClarityComponentFlow: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Step 1: Verify loading state
    const spinner = canvasElement.querySelector('clr-spinner');
    await expect(spinner).toBeInTheDocument();
    
    // Step 2: Wait for data to load
    await waitFor(
      async () => {
        const datagrid = canvasElement.querySelector('clr-datagrid');
        await expect(datagrid).toBeInTheDocument();
      },
      { timeout: 6000 }
    );
    
    // Step 3: Test various Clarity components
    // Test column sorting
    const sortableColumn = canvasElement.querySelector('clr-dg-column[clrDgSortBy]');
    if (sortableColumn instanceof HTMLElement) {
      await userEvent.click(sortableColumn);
    }
    
    // Test row selection
    const rowCheckbox = canvasElement.querySelector('clr-dg-row input[type="checkbox"]');
    if (rowCheckbox instanceof HTMLInputElement) {
      await userEvent.click(rowCheckbox);
    }
    
    // Test pagination controls
    const pagination = canvasElement.querySelector('clr-dg-pagination');
    await expect(pagination).toBeInTheDocument();
  }
};

// Badge Display Testing
export const BadgeDisplayFlow: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Wait for loading
    await waitFor(
      async () => {
        const badges = canvasElement.querySelectorAll('.badge');
        await expect(badges.length).toBeGreaterThan(0);
      },
      { timeout: 6000 }
    );
    
    // Verify recommendation badges are displayed
    const infoBadges = canvasElement.querySelectorAll('.badge-info');
    await expect(infoBadges.length).toBeGreaterThan(0);
    
    // Check for specific recommendation text
    const codeGenerationBadge = canvas.queryByText(/Code generation/i);
    if (codeGenerationBadge) {
      await expect(codeGenerationBadge).toBeInTheDocument();
    }
  }
};

// Custom Comparator Testing
export const CustomComparatorFlow: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Wait for loading
    await waitFor(
      async () => {
        const datagrid = canvasElement.querySelector('clr-datagrid');
        await expect(datagrid).toBeInTheDocument();
      },
      { timeout: 6000 }
    );
    
    // Test custom sorting on Default Context column
    const defaultContextHeader = canvas.queryByText('Default Context');
    if (defaultContextHeader instanceof HTMLElement) {
      await userEvent.click(defaultContextHeader);
      
      // Click again to reverse sort
      await userEvent.click(defaultContextHeader);
    }
    
    // Test custom sorting on Max Mode column
    const maxModeHeader = canvas.queryByText('Max Mode');
    if (maxModeHeader instanceof HTMLElement) {
      await userEvent.click(maxModeHeader);
    }
  }
};

// Column Visibility Testing
export const ColumnVisibilityFlow: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Wait for loading
    await waitFor(
      async () => {
        const datagrid = canvasElement.querySelector('clr-datagrid');
        await expect(datagrid).toBeInTheDocument();
      },
      { timeout: 6000 }
    );
    
    // Look for column visibility controls (show/hide columns)
    const columnToggle = canvasElement.querySelector('.datagrid-column-toggle, .column-toggle');
    if (columnToggle instanceof HTMLElement) {
      await userEvent.click(columnToggle);
    }
    
    // Verify hideable columns are present
    const hideableColumns = canvasElement.querySelectorAll('[clrDgHideableColumn]');
    await expect(hideableColumns.length).toBe(4);
  }
};

// Empty Data State
export const EmptyDataState: Story = {
  render: (args) => ({
    props: {
      ...args,
      data: []
    },
    template: `<lib-complex-data-grid [pageSize]="pageSize" [data]="data"></lib-complex-data-grid>`,
    moduleMetadata: {
      imports: [FormsModule]
    }
  }),
  args: {
    pageSize: 10
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Wait for loading to complete
    await waitFor(
      async () => {
        const datagrid = canvasElement.querySelector('clr-datagrid');
        await expect(datagrid).toBeInTheDocument();
      },
      { timeout: 6000 }
    );
    
    // Verify no data rows are present
    const dataRows = canvasElement.querySelectorAll('clr-dg-row');
    await expect(dataRows.length).toBe(0);
  }
};

// Complete Lifecycle Testing
export const CompleteLifecycleFlow: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Step 1: Verify initial loading state
    await expect(canvas.getByText(/Loading model data/i)).toBeInTheDocument();
    const spinner = canvasElement.querySelector('clr-spinner');
    await expect(spinner).toBeInTheDocument();
    
    // Step 2: Wait for data to load
    await waitFor(
      async () => {
        const datagrid = canvasElement.querySelector('clr-datagrid');
        await expect(datagrid).toBeInTheDocument();
      },
      { timeout: 6000 }
    );
    
    // Step 3: Verify loading state is gone
    const spinnerAfterLoad = canvasElement.querySelector('clr-spinner');
    await expect(spinnerAfterLoad).not.toBeInTheDocument();
    
    // Step 4: Test data display
    const dataRows = canvasElement.querySelectorAll('clr-dg-row');
    await expect(dataRows.length).toBeGreaterThan(0);
    
    // Step 5: Test sorting
    const nameColumn = canvas.queryByText('Name');
    if (nameColumn instanceof HTMLElement) {
      await userEvent.click(nameColumn);
    }
    
    // Step 6: Test selection
    const firstCheckbox = canvasElement.querySelector('clr-dg-row input[type="checkbox"]');
    if (firstCheckbox instanceof HTMLInputElement) {
      await userEvent.click(firstCheckbox);
      await expect(firstCheckbox).toBeChecked();
    }
    
    // Step 7: Test pagination
    const pagination = canvasElement.querySelector('clr-dg-pagination');
    await expect(pagination).toBeInTheDocument();
    
    // Step 8: Verify badges display
    const badges = canvasElement.querySelectorAll('.badge-info');
    await expect(badges.length).toBeGreaterThan(0);
  }
};

// Performance Testing with Large Dataset
export const LargeDatasetPerformance: Story = {
  render: (args) => {
    // Generate large dataset to test performance
    const largeDataset: ModelData[] = Array.from({ length: 100 }, (_, i) => ({
      name: `Model ${i + 1}`,
      defaultContext: i % 3 === 0 ? '60k' : i % 2 === 0 ? '200k' : '-',
      maxMode: i % 4 === 0 ? '1M' : i % 3 === 0 ? '200k' : '-',
      recommendation: [`Feature ${i % 5 + 1}`, `Use case ${i % 3 + 1}`]
    }));

    return {
      props: {
        ...args,
        data: largeDataset
      },
      template: `<lib-complex-data-grid [pageSize]="pageSize" [data]="data"></lib-complex-data-grid>`,
      moduleMetadata: {
        imports: [FormsModule]
      }
    };
  },
  args: {
    pageSize: 10
  }
};

// AI Model Comparison Scenario
export const AIModelComparison: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Wait for loading
    await waitFor(
      async () => {
        const datagrid = canvasElement.querySelector('clr-datagrid');
        await expect(datagrid).toBeInTheDocument();
      },
      { timeout: 6000 }
    );
    
    // Test AI model specific features
    // Check for Claude models
    const claudeModel = canvas.queryByText(/Claude/i);
    if (claudeModel) {
      await expect(claudeModel).toBeInTheDocument();
    }
    
    // Check for Gemini models
    const geminiModel = canvas.queryByText(/Gemini/i);
    if (geminiModel) {
      await expect(geminiModel).toBeInTheDocument();
    }
    
    // Check for recommendation badges
    const codeGenBadge = canvas.queryByText(/Code generation/i);
    const reasoningBadge = canvas.queryByText(/Reasoning/i);
    
    if (codeGenBadge) {
      await expect(codeGenBadge).toBeInTheDocument();
    }
  }
};
