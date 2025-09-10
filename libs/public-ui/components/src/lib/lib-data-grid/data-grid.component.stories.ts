import type { Meta, StoryObj } from '@storybook/angular';
import { DataGridComponent } from './data-grid.component';
import { themes } from '@storybook/theming';

const meta: Meta<DataGridComponent> = {
  title: 'Public UI/DataGrid',
  component: DataGridComponent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    users: {
      description: 'Array of user objects to display in the data grid',
      control: { type: 'object' },
      table: {
        type: { 
          summary: 'User[]',
          detail: 'Array of User objects with id, name, email, role, and status properties'
        },
        defaultValue: { summary: 'Default users array' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<DataGridComponent>;

export const Default: Story = {
  args: {
    users: [
      { id: 1, name: 'John Smith', email: 'john.smith@mock.com', role: 'Admin', status: 'Online' },
      { id: 2, name: 'Jane Doe', email: 'jane.doe@mock.com', role: 'User', status: 'Online' },
      { id: 3, name: 'Bob Johnson', email: 'bob.johnson@mock.com', role: 'User', status: 'Offline' },
      { id: 4, name: 'Alice Brown', email: 'alice.brown@mock.com', role: 'Admin', status: 'Online' },
      { id: 5, name: 'Charlie Wilson', email: 'charlie.wilson@mock.com', role: 'User', status: 'Online' },
      { id: 6, name: 'Diana Prince', email: 'diana.prince@mock.com', role: 'Admin', status: 'Online' },
    ],
  },
};

export const WithCustomData: Story = {
  args: {},
  render: (args) => ({
    props: {
      ...args,
      users: [
        { id: 1, name: 'Alice Johnson', email: 'alice@mock.com', role: 'Customer', status: 'Online' },
        { id: 2, name: 'Bob Smith', email: 'bob@mock.com', role: 'User', status: 'Online' },
        { id: 3, name: 'Charlie Brown', email: 'charlie@mock.com', role: 'Admin', status: 'Offline' },
      ]
    },
  }),
  parameters: {
    themes: 'dark'
  }
};