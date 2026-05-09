# 🎭 Playwright TypeScript Template

[![Playwright](https://img.shields.io/badge/Playwright-v1.44.0-45ba4b?style=flat-square&logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

A production-ready template for end-to-end testing with **Playwright** and **TypeScript**, built on the **Page Object Model** design pattern. Designed to provide a clean, scalable foundation for browser automation projects.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Test Scenarios](#-test-scenarios)
- [Design Patterns](#-design-patterns)
- [Reports](#-reports)
- [Author](#-author)

---

## ✨ Features

- **Page Object Model (POM)** — maintainable, reusable page abstractions
- **Global Setup** — centralised authentication and environment bootstrapping via `global-setup.ts`
- **Test Configuration** — externalised test settings through `test-config.ts`
- **Parallel Execution** — tests run concurrently for faster feedback
- **Smart Artifacts** — screenshots on failure, video on first retry, trace on first retry
- **HTML Reporter** — rich, interactive test reports out of the box
- **Google Chrome** — tests execute against the stable Chrome channel
- **TypeScript-First** — full type safety across tests, pages, and utilities

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
| --- | --- | --- |
| [Playwright](https://playwright.dev/) | 1.44.0 | Browser automation & test runner |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Static typing & developer experience |
| [Node.js](https://nodejs.org/) | ≥ 20.x | JavaScript runtime |
| [Google Chrome](https://www.google.com/chrome/) | Stable | Target browser (Chrome channel) |

---

## 📁 Project Structure

```
playwright-typescript-template/
├── pages/                      # Page Object Model classes
│   ├── login.page.ts
│   └── logout.page.ts
├── tests/                      # Test specifications
│   ├── login.spec.ts
│   └── logout.spec.ts
├── test-data/                  # Test fixtures and data files
├── global-setup.ts             # Global setup (runs once before all tests)
├── test-config.ts              # Shared test configuration and constants
├── playwright.config.ts        # Playwright configuration
├── tsconfig.json               # TypeScript compiler options
├── package.json                # Dependencies and scripts
└── README.md
```

---

## 📋 Prerequisites

| Requirement | Minimum Version |
| --- | --- |
| Node.js | 20.x |
| npm | 10.x |
| Google Chrome | Stable channel |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ridhotadjudin/playwright-typescript-template.git
cd playwright-typescript-template
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

### 4. Run tests

```bash
# Run all tests
npm test

# Run all end-to-end tests
npm run test:e2e:all

# Run smoke tests only
npm run test:e2e:smoke

# Open the HTML report
npm run report
```

### Available Scripts

| Script | Command | Description |
| --- | --- | --- |
| `test` | `npm test` | Run the default test suite |
| `test:e2e:all` | `npm run test:e2e:all` | Run all end-to-end tests |
| `test:e2e:smoke` | `npm run test:e2e:smoke` | Run smoke-tagged tests |
| `report` | `npm run report` | Open the HTML test report |

---

## 🧪 Test Scenarios

| Test File | Scenario | Description |
| --- | --- | --- |
| `login.spec.ts` | Login | Validates user authentication flows including valid credentials, invalid credentials, and field validations |
| `logout.spec.ts` | Logout | Validates user sign-out behaviour and session termination |

---

## 🏗 Design Patterns

### Page Object Model (POM)

Every page in the application under test is represented by a dedicated class inside the `pages/` directory. Each class encapsulates:

- **Locators** — element selectors scoped to the page
- **Actions** — reusable methods that interact with the page
- **Assertions** — page-specific verification helpers

```typescript
// pages/login.page.ts
import { type Page, type Locator } from '@playwright/test';

export class LoginPage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('button[type="submit"]');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

Tests consume page objects, keeping specs clean and focused:

```typescript
// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test('should log in with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('user@example.com', 'securePassword');
  await expect(page).toHaveURL(/dashboard/);
});
```

---

## 📊 Reports

### Playwright Configuration Highlights

| Setting | Value |
| --- | --- |
| Timeout | 100 seconds |
| Execution | Parallel |
| Reporter | HTML |
| Browser | Google Chrome (stable channel) |
| Screenshot | On failure |
| Video | On first retry |
| Trace | On first retry |

### HTML Reporter

After a test run, generate and view the interactive HTML report:

```bash
npm run report
```

The report includes:

- ✅ Pass/fail status for every test
- 📸 **Screenshots** — automatically captured on test failure
- 🎥 **Videos** — recorded on the first retry of a failed test
- 🔍 **Traces** — full Playwright trace collected on the first retry, viewable in the [Trace Viewer](https://playwright.dev/docs/trace-viewer)

### Playwright Config Reference

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';
import { testConfig } from './test-config';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  timeout: 100_000,
  reporter: 'html',
  globalSetup: './global-setup.ts',
  use: {
    browserName: 'chromium',
    channel: 'chrome',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    trace: 'on-first-retry',
  },
});
```

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Ridho Tadjudin**

- 🌐 Website — [ridhotadjudin.id](https://ridhotadjudin.id)
- 💻 GitHub — [@ridhotadjudin](https://github.com/ridhotadjudin)

---

<p align="center">
  Built with ❤️ using <a href="https://playwright.dev/">Playwright</a> and <a href="https://www.typescriptlang.org/">TypeScript</a>
</p>

