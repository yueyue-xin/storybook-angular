import { defineConfig, devices } from '@playwright/test';
import { nxE2EPreset } from '@nx/playwright/preset';
import { workspaceRoot } from '@nx/devkit';

// For CI, you may want to set BASE_URL to the deployed application.
const baseURL = process.env['BASE_URL'] || 'http://localhost:4200';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './apps/storybook-project-e2e' }),
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  outputDir: 'dist/.playwright/test-output',           // 所有 artifacts 输出目录
  snapshotDir: 'dist/.playwright/test-output/snapshots',
  use: {
    baseURL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    /* Take screenshot on failure */
    screenshot: 'only-on-failure',
    /* Record video on failure */
    video: 'retain-on-failure',
    /* Angular specific settings */
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
  },
  /* Test configuration */
  timeout: 30 * 1000,
  expect: {
    /* Maximum time expect() should wait for the condition to be met */
    timeout: 5 * 1000,
  },
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Parallel tests in CI, sequential in development */
  workers: process.env.CI ? 4 : 1,
  /* Reporter configuration */
  reporter: [
    ['html'],
    ['json', { outputFile: 'dist/.playwright/test-results.json' }],
  ],
  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npx nx serve storybook-project',
    url: 'http://localhost:4200',
    reuseExistingServer: true,
    cwd: workspaceRoot,
    timeout: 120 * 1000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
