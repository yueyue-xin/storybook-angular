// import { test, expect } from '@playwright/test';
import { test, expect } from '@chromatic-com/playwright';

test.describe('Angular Application Navigation', () => {
  test('should redirect to hello page by default', async ({ page }) => {
    await page.goto('/');
    
    // redirect to /hello
    await expect(page).toHaveURL('/hello');
    await expect(page.locator('h1')).toContainText('Clarity DataGrid Demo');
  });

  test('should navigate between pages', async ({ page }) => {
    await page.goto('/');
    
    // initial page
    await expect(page.locator('h1')).toContainText('Clarity DataGrid Demo');
    
    // navigate to new-data page
    await page.goto('/new-data');
    await expect(page).toHaveURL('/new-data');
  });
});
