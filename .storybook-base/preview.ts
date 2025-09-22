import { applicationConfig } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import type { Preview } from '@storybook/angular';
import { addons } from '@storybook/preview-api';

let linkEl: HTMLLinkElement | null = null;

addons.getChannel().on('update-story-theme', (theme) => {
  document.body.setAttribute('cds-theme', theme);
});

const basePreview: Preview = {
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule),
        importProvidersFrom(ClarityModule),
      ],
    }),
    (storyFn, context) => {
      const theme = context.parameters['theme'] ?? context.globals['theme'];
      document.body.setAttribute('cds-theme', theme);

      const spacing = context.parameters['layoutSpacing'] ?? context.globals['layoutSpacing'];

      if (!linkEl) {
        linkEl = document.createElement('link');
        linkEl.rel = 'stylesheet';
        linkEl.id = 'dynamic-layout-style';
        document.head.appendChild(linkEl);
      }

      const supportedSpacings = ['provisioning-ui', 'cloud-auto', 'relocation'];
      if (supportedSpacings.includes(spacing)) {
        linkEl.href = `/page-css-list/${spacing}.css`;
      }

      return storyFn();
    },
  ],
  parameters: {
    layout: 'centered',
    tags: ['autodocs'],
    docs: {
      toc: true,
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
    language: {
      name: 'Language',
      description: 'Global language',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'fr', title: 'Français' },
          { value: 'es', title: 'Español' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
    layoutSpacing: {
      name: 'Page Context',
      description: 'Select the target page environment for component testing',
      defaultValue: 'normal',
      toolbar: {
        icon: 'component',
        items: [
          { value: 'provisioning-ui', title: 'Provisioning UI', right: 'Components as they appear in provisioning UI' },
          { value: 'cloud-auto', title: 'Cloud Automation UI', right: 'Main application' },
          { value: 'relocation', title: 'Relocation UI', right: 'Components in relocation UI' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
};

export default basePreview;