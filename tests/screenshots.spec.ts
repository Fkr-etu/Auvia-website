import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Auvia Screenshots Generator', () => {
  test.beforeAll(async () => {
    // Ensure the screenshots folder exists
    const dir = path.join(process.cwd(), 'screenshots');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  test('Capture screenshots of all views', async ({ page }) => {
    // 1. Visit the Landing Page
    console.log('Navigating to Landing Page...');
    await page.goto('/');
    
    // Wait for initial animation/loading
    await page.waitForTimeout(1500);
    
    // Take Landing Page screenshot
    console.log('Capturing Landing Page screenshot...');
    await page.screenshot({
      path: 'screenshots/1-landing-page.png',
      fullPage: true,
    });

    // 2. Click on "Mode Démo Direct" to go to SaaS Workspace
    console.log('Navigating to SaaS Workspace...');
    const demoBtn = page.locator('#nav-demo-btn');
    await expect(demoBtn).toBeVisible();
    await demoBtn.click();
    
    // Wait for workspace transition and rendering
    await page.waitForTimeout(2000);
    
    // Take SaaS Dashboard screenshot
    console.log('Capturing SaaS Dashboard screenshot...');
    await page.screenshot({
      path: 'screenshots/2-saas-dashboard.png',
      fullPage: false, // Viewport only to keep sidebar fixed
    });

    // 3. Go back to Landing Page from SaaS Workspace sidebar
    console.log('Returning to Landing Page from SaaS...');
    const sidebarBackBtn = page.locator('#sidebar-back-btn');
    await expect(sidebarBackBtn).toBeVisible();
    await sidebarBackBtn.click();
    await page.waitForTimeout(1500);

    // 4. Click on "App Mobile" in Landing Page footer to open Mobile Simulator
    console.log('Navigating to Mobile Simulator...');
    const footerMobileBtn = page.locator('#footer-mobile-btn');
    await expect(footerMobileBtn).toBeVisible();
    await footerMobileBtn.scrollIntoViewIfNeeded();
    await footerMobileBtn.click();
    
    // Wait for transition
    await page.waitForTimeout(2000);
    
    // Take Mobile Simulator screenshot
    console.log('Capturing Mobile Simulator screenshot...');
    await page.screenshot({
      path: 'screenshots/3-mobile-simulator.png',
      fullPage: false,
    });

    // 5. Go back to Landing Page from Mobile Simulator
    console.log('Returning to Landing Page from Mobile Simulator...');
    const mobileBackBtn = page.locator('#mobile-back-btn');
    await expect(mobileBackBtn).toBeVisible();
    await mobileBackBtn.click();
    await page.waitForTimeout(1500);

    // 6. Click on "Charte Graphique" in Landing Page footer to open Brand Center
    console.log('Navigating to Brand Center...');
    const footerBrandBtn = page.locator('#footer-brand-btn');
    await expect(footerBrandBtn).toBeVisible();
    await footerBrandBtn.scrollIntoViewIfNeeded();
    await footerBrandBtn.click();
    
    // Wait for transition
    await page.waitForTimeout(2000);
    
    // Take Brand Center screenshot
    console.log('Capturing Brand Center screenshot...');
    await page.screenshot({
      path: 'screenshots/4-brand-center.png',
      fullPage: true,
    });

    // 7. Go back to Landing Page from Brand Center
    console.log('Returning to Landing Page from Brand Center...');
    const brandBackBtn = page.locator('#brand-back-btn');
    await expect(brandBackBtn).toBeVisible();
    await brandBackBtn.click();
    await page.waitForTimeout(1500);

    // Verify we are back on landing page
    const finalDemoBtn = page.locator('#nav-demo-btn');
    await expect(finalDemoBtn).toBeVisible();
    console.log('Screenshots generated successfully!');
  });
});
