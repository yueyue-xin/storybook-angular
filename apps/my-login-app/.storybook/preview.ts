import type { Preview } from '@storybook/angular';
import { basePreview } from '@storybook-config';

const preview: Preview = {
  ...basePreview,
  // my-login-app specific config
};

export default preview;
