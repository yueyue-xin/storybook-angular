import { test, expect } from '@chromatic-com/playwright';

test.describe('Visual Regression Tests', () => {
  test('should match hello page visual snapshot', async ({ page }) => {
    await page.goto('/hello');
    
    await expect(page.locator('lib-data-grid')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Clarity DataGrid Demo');
    
    // take page screenshot
    await expect(page).toHaveScreenshot('hello-page.png');
  });

  test('should match new-data page visual snapshot', async ({ page }) => {
    await page.goto('/new-data');
    
    await expect(page.locator('lib-complex-data-grid')).toBeVisible();
    
    // take page screenshot
    await expect(page).toHaveScreenshot('new-data-page.png');
  });

  test('should match data grid component visual snapshot', async ({ page }) => {
    await page.goto('/hello');
    
    await expect(page.locator('lib-data-grid')).toBeVisible();
    
    // take screenshot
    await expect(page.locator('lib-data-grid')).toHaveScreenshot('data-grid-component.png');
  });

  test('should match complex data grid component visual snapshot', async ({ page }) => {
    await page.goto('/new-data');
    
    await expect(page.locator('lib-complex-data-grid')).toBeVisible();
    
    // take screenshot
    await expect(page.locator('lib-complex-data-grid')).toHaveScreenshot('complex-data-grid-component.png');
  });
});