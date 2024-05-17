import { test, expect, Browser, Page, Locator } from '@playwright/test';
import { time } from 'console';
import { TIMEOUT } from 'dns';
import { webkit, chromium, firefox } from 'playwright';
import { setTimeout } from 'timers';

test('login test', async({page})=>{
  await page.goto("http://staging-chief.nexcloud.id/");

  await expect(page).toHaveTitle('Nexchief');
  
  const inputUsername:Locator = await page.locator("//input[@id='username']");
  const inputPassword:Locator = await page.locator("//input[@id='password']");
  const btnLogin:Locator = await page.locator("button[type='submit']");

  await inputUsername.fill("xxxxxxxxxxxx");
  console.log("Success input username");

  await inputPassword.fill("xxxxxxxxxxxxx");
  console.log("Success input password");

  await btnLogin.click();
  console.log("Success click login");
  
  const titlePortalPage = await page.title();
  console.log("Portal Page title: ", titlePortalPage);

  await page.screenshot({path: 'test-results/portal.png'});

  await expect(titlePortalPage).toEqual('Nexchief');

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
