const { expect }  =require('@playwright/test');
const { PlaywrightBlocker } = require('@cliqz/adblocker-playwright');
import fetch from 'cross-fetch';

class LoginPage {
    constructor(page) {
        
        this.page = page;
        this.btnLogin = page.locator("");
    }
};