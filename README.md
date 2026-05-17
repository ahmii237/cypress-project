# CSE482 — Software Testing | Terminal Lab Spring 2026
**Cypress End-to-End Testing Project**

| Field | Detail |
|---|---|
| Course | CSE482 Software Testing |
| Instructor | Ms. Yella Mehroze |
| Semester | 8th — Spring 2026 |
| Website Under Test | https://www.saucedemo.com |

---

## Project Structure

```
cypress-project/
├── cypress/
│   ├── e2e/
│   │   ├── task1/
│   │   │   ├── login.cy.js        ← Login Tests 1, 2, 3
│   │   │   ├── navigation.cy.js   ← Navigation Tests 1, 2
│   │   │   └── form.cy.js         ← Form Test 1 (checkout form)
│   │   └── task2/
│   │       └── assertions_aliases_commands.cy.js  ← All Task 2 exercises
│   ├── support/
│   │   ├── commands.js            ← Custom commands: login(), logout(), addToCart()
│   │   └── e2e.js                 ← Auto-loaded support file
│   └── screenshots/               ← Auto-generated on cy.screenshot()
├── cypress.config.js
├── package.json
└── README.md
```

---

## Prerequisites

- **Node.js** v18 or higher — download from https://nodejs.org
- **npm** (bundled with Node.js)

---

## Installation

```bash
# Clone or download the project, then navigate into it
cd cypress-project

# Install dependencies
npm install
```

---

## Running the Tests

### Open Cypress Test Runner (interactive / browser UI)
```bash
npm run test:open
```
This opens the Cypress GUI. Select **E2E Testing**, choose a browser (Chrome recommended), and click any spec file to run it with live preview.

### Run all tests headlessly (terminal output)
```bash
npm test
```

### Run Task 1 tests only
```bash
npm run test:task1
```

### Run Task 2 tests only
```bash
npm run test:task2
```

---

## Task 1 — UI Test Suite

All spec files are in `cypress/e2e/task1/`.

| File | Tests |
|---|---|
| `login.cy.js` | Login Test 1 (valid credentials), Login Test 2 (wrong password), Login Test 3 (empty fields) |
| `navigation.cy.js` | Navigation Test 1 (cart page), Navigation Test 2 (products → burger menu) |
| `form.cy.js` | Form Test 1 (complete checkout form → order confirmation) |

**Test credentials used:**
- Valid: `standard_user` / `secret_sauce`
- Invalid: `standard_user` / `wrong_password`

Every test uses `cy.visit()`, `cy.get()`, and `cy.should()` as required.

---

## Task 2 — Assertions, Aliases & Custom Commands

All spec files are in `cypress/e2e/task2/`. Custom commands are in `cypress/support/commands.js`.

### Exercises covered

| Exercise | Where |
|---|---|
| **Assertion Practice** — `be.visible`, `have.text`, `have.attr` | `assertions_aliases_commands.cy.js` — *Assertion Practice* suite |
| **Negative Assertion** — `not.exist` | Same file — *Assertion Practice* suite |
| **Alias Practice** — `.as()` and `cy.get('@alias')` | Same file — *Alias Practice* suite |
| **Custom Command** — `cy.login()`, `cy.logout()`, `cy.addToCart()` | `cypress/support/commands.js`, used in *Custom Command* suite |
| **beforeEach Hook** — `cy.login()` runs before every test | All `describe` blocks in Task 2 |
| **Bonus** — visible element check, dropdown select, `cy.contains()`, `cy.screenshot()` | Same file — *Bonus* suite |

---

## Reflection — What I Found Difficult (Task 2)

The most challenging part of Task 2 was understanding **aliases** (`cy.get(...).as()`). At first I tried reusing an alias across `describe` blocks, which failed because aliases are scoped to the current test. I solved this by moving the `.as()` call inside the same `it()` block where I needed to reuse the element, and by reading the Cypress docs on subject management. Once I understood that an alias is essentially a named reference tied to the current test's command queue, the pattern clicked and it became a clean way to avoid repeating the same `cy.get()` selector.

---

## Screenshots

Screenshots are saved automatically to `cypress/screenshots/` when:
- A test calls `cy.screenshot()` explicitly (e.g., `order-confirmation.png`, `inventory-page.png`)
- A test fails (Cypress captures the failure state automatically)
