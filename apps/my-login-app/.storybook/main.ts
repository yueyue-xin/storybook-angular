import type { StorybookConfig } from '@storybook/angular';
import baseConfig from '../../../.storybook-base/main';


const config: StorybookConfig = {
  ...baseConfig,
  stories: ['../src/**/*.stories.@(ts|js|mdx)'],
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
