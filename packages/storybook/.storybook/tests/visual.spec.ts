import { test, expect } from '@playwright/test';

// Basic visual regression for a couple of core stories
const stories = ['Alert', 'Button', 'Input', 'Tabs'];

for (const story of stories) {
  test(`visual: ${story}`, async ({ page }) => {
    await page.goto(
      `http://localhost:6006/?path=/story/${story.toLowerCase()}--basic`
    );
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot(`${story.toLowerCase()}-basic.png`, {
      fullPage: false,
    });
  });
}
