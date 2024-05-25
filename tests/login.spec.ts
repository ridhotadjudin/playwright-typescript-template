import { test, expect, Browser, Page, Locator } from '@playwright/test';
import { baseUrl, username, password } from '../.cert/Credentials.ts'

test('login test', async({page})=>{
  await page.goto(baseUrl);

  await expect(page).toHaveTitle('Nexchief');
  
  const inputUsername:Locator = await page.locator("//input[@id='username']");
  const inputPassword:Locator = await page.locator("//input[@id='password']");
  const btnLogin:Locator = await page.locator("button[type='submit']");
  const popUpLoginDenied:Locator = await page.locator("//div[@class='Modal_ModalTitle__1w84A']");
  const btnYesLogout:Locator = await page.locator("//span[normalize-space()='Yes, Logout']");

  const txtPortal:Locator = await page.locator("//div[@class='Schema_Title__3kazt']");

  await inputUsername.type(username);
  console.log("Success input username");
  await page.waitForTimeout(1000);

  await inputPassword.type(password);
  console.log("Success input password");
  await page.waitForTimeout(1000);

  await btnLogin.click();
  console.log("Success click login");
  await page.waitForTimeout(1000);

  if(popUpLoginDenied){
    btnYesLogout.click();
    console.log("Success re-login");
    await page.waitForTimeout(1000);
  }

  await expect(txtPortal.getByText('Portal Akun Nexchief')).toBeVisible;
  console.log("Success login");
  await page.waitForTimeout(1000);
  
  await page.screenshot({path: 'test-results/portal.png'});
  await page.waitForTimeout(1000);

});
