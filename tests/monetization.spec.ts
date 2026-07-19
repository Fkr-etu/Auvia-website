import { test, expect } from '@playwright/test';

test.describe('Auvia Monetization & Stripe Simulation Flow', () => {
  test('Verify Stripe Checkout and SaaS Premium Transition', async ({ page }) => {
    // 1. Visit the Landing Page
    await page.goto('/');
    await page.waitForTimeout(1500);

    // 2. Select the "Individuel Solo" plan button
    const stripeBtn = page.getByRole('button', { name: "S'abonner via Stripe" }).first();
    await expect(stripeBtn).toBeVisible();
    await stripeBtn.scrollIntoViewIfNeeded();
    await stripeBtn.click();

    // 3. Verify Stripe Checkout modal is open
    const stripeModalTitle = page.locator('text=Paiement 100% sécurisé via Stripe').first();
    await expect(stripeModalTitle).toBeVisible();

    // 4. Fill in cardholder name
    const cardHolderInput = page.locator('input[value="Dr Lucie Martin"]');
    await expect(cardHolderInput).toBeVisible();

    // 5. Submit Stripe Payment
    const payBtn = page.getByRole('button', { name: 'Payer et Activer mon abonnement' });
    await expect(payBtn).toBeVisible();
    await payBtn.click();

    // 6. Verify Stripe Success Screen
    const successTitle = page.locator('h4', { hasText: 'Paiement Validé avec Succès !' });
    await expect(successTitle).toBeVisible({ timeout: 5000 });

    // 7. Click to open Workspace
    const workspaceBtn = page.getByRole('button', { name: 'Consulter mon Workspace' });
    await expect(workspaceBtn).toBeVisible();
    await workspaceBtn.click();

    // 8. Verify the SaaS workspace is active and reflects the Pro status
    const workspaceHeader = page.locator('span', { hasText: 'PRO :' });
    await expect(workspaceHeader).toBeVisible();

    // 9. Go to the "Abonnement & Factures" tab
    const billingTabBtn = page.locator('#tab-billing');
    await expect(billingTabBtn).toBeVisible();
    await billingTabBtn.click();

    // 10. Check if Stripe Customer Portal shows the active plan
    const activeFormula = page.locator('h4', { hasText: 'Individuel Solo' }).first();
    await expect(activeFormula).toBeVisible();

    // 11. Test simulated invoice history
    const paidBadge = page.locator('span', { hasText: 'PAYÉ' }).first();
    await expect(paidBadge).toBeVisible();
  });
});
