import { test, expect } from '@playwright/test';

test.describe('Data Grid Component Tests', () => {
  test('should render basic data grid on hello page', async ({ page }) => {
    await page.goto('/hello');
    
    await expect(page.locator('lib-data-grid')).toBeVisible();
    
    await expect(page.locator('h1')).toContainText('Clarity DataGrid Demo');
    
    await expect(page.locator('.content-container')).toBeVisible();
  });

  test('should render complex data grid on new-data page', async ({ page }) => {
    await page.goto('/new-data');
    
    await expect(page.locator('lib-complex-data-grid')).toBeVisible();
    
    await expect(page.locator('.content-container')).toBeVisible();
  });
});