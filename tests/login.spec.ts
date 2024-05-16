import { test, expect, Browser, Page, Locator } from '@playwright/test';
import { webkit, chromium, firefox } from 'playwright';

test('login test', async({page})=>{
  await page.goto("http://staging-chief.nexcloud.id/");

  await expect(page).toHaveTitle('Nexchief');
  
  const inputUsername:Locator = await page.locator('#username');
  const inputPassword:Locator = await page.locator('#password');
  const btnLogin:Locator = await page.locator("[type='submit']");

  await inputUsername.fill("xxxxxxxxxxxxx");
  await inputUsername.fill("xxxxxxxxxxxxx");
  await btnLogin.click();
  
  const titlePortalPage = await page.title();
  console.log("Portal Page title: ", titlePortalPage);

  await page.screenshot({path: 'portal.png'});

  await expect(titlePortalPage).toEqual('Nexchief');

  page.close();
});

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
