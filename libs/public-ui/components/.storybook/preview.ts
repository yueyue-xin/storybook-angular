import { applicationConfig } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import type { Preview } from '@storybook/angular';
import { addons } from '@storybook/preview-api';
import { themes } from '@storybook/theming';

import { ClarityIcons, tagsIcon } from '@cds/core/icon';
ClarityIcons.addIcons(tagsIcon);

// const mockVmwClarityThemeService = new MockVmwClarityThemeService();
// const mockTranslocoService = new MockTranslocoService();

let linkEl: HTMLLinkElement | null = null;

addons.getChannel().on('update-story-theme', (theme) => {
  document.body.setAttribute('cds-theme', theme);
});

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule),
        importProvidersFrom(ClarityModule),
        // importProvidersFrom(StorybookRouterMockModule),
        // ...provideStorybookRouter(),
        // { provide: VmwClarityThemeService, useValue: mockVmwClarityThemeService },
        // { provide: TranslocoService, useValue: mockTranslocoService },
      ],
    }),
    (storyFn, context) => {
      // const themeService = mockVmwClarityThemeService;
      const theme = context.parameters['theme'] ?? context.globals['theme'];
      console.log(context);
      // themeService.setTheme(theme);

      // const channel = addons.getChannel();
      document.body.setAttribute('cds-theme', theme);

      // channel.emit('update-story-theme', theme);
      // context.parameters['docs'].theme = theme === VmwClarityTheme.Light ? themes.light : themes.dark;

      // const translocoService = mockTranslocoService;
      // translocoService.setActiveLang(context.globals['language']);

      const spacing = context.parameters['layoutSpacing'] ?? context.globals['layoutSpacing'];
      // const config = styleConfig[spacing as string];

      if (!linkEl) {
        linkEl = document.createElement('link');
        linkEl.rel = 'stylesheet';
        linkEl.id = 'dynamic-layout-style';
        document.head.appendChild(linkEl);
      }

      if(['provisioning-ui', 'cloud-auto', 'relocation'].includes(spacing)) {
        linkEl.href = `/page-css-list/${spacing}.css`;
      }

      return storyFn();
    },
  ],
  parameters: {
    layout: 'centered',
    tags: ['autodocs'],
    docs: {
      theme: themes.light,
    },
    demo: {
      demoProperty: 'b',
      anotherDemoProperty: 'b',
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
    // pageContext: {
    //   name: 'Page Context',
    //   description: 'Select the target page environment for component testing',
    //   defaultValue: 'cloud-automation',
    //   toolbar: {
    //     icon: 'component',
    //     items: PAGE_CONTEXTS.map((context) => ({
    //       value: context.id,
    //       title: context.name,
    //       right: context.description,
    //     })),
    //     showName: true,
    //     dynamicTitle: true,
    //   },
    // },
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

export default preview;
