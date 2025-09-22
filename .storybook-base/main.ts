import type { StorybookConfig } from '@storybook/angular';

const baseConfig: StorybookConfig = {
  stories: [],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/theming',
    '@storybook/addon-designs',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/angular',
    options: {
      enableIvy: true,
      angularBrowserTarget: 'storybook-project:build',
    },
  },
  docs: {
    autodocs: 'tag',
  },
  core: {
    builder: '@storybook/builder-webpack5',
  },
  staticDirs: [
    { from: './assets/page-css-list', to: '/page-css-list' },
  ],
  typescript: {
    check: false,
  },
};

export default baseConfig;