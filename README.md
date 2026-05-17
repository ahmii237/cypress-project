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

# COMPLETE BEGINNER GUIDE — How to Run Tests Step by Step

Follow every step in order. Do not skip any step.

---

## STEP 1 — Install Node.js (Only needed once ever)

1. Open your browser and go to: **https://nodejs.org**
2. Click the big green button that says **"LTS"** (recommended version)
3. Download and run the installer
4. Keep clicking **Next** and then **Install** — leave all options as default
5. When done, click **Finish**

**Verify it worked:**
1. Press `Win + X` on your keyboard
2. Click **Terminal** or **Windows PowerShell**
3. Type this and press Enter:
   ```
   node --version
   ```
4. You should see something like `v20.x.x` — if yes, Node.js is ready

---

## STEP 2 — Open the Project in Terminal

1. Press `Win + X` → click **Terminal** (or **Windows PowerShell**)
2. Type the following and press Enter:
   ```powershell
   cd "d:\8th Semester\Automated Software testing\Terminal Project\part b\cypress-project"
   ```
3. You should now see the path in your terminal change to the project folder

---

## STEP 3 — Install Project Dependencies (Only once)

In the same terminal, type this and press Enter:

```powershell
npm install
```

- This will download Cypress and all required packages
- It will take **2–5 minutes** depending on your internet speed
- You will see a lot of text scrolling — this is normal
- Wait until you see the cursor blinking again (meaning it finished)

---

## STEP 4 — Open the Cypress Test Runner

Type this in the terminal and press Enter:

```powershell
npx cypress open
```

A new window will open — this is the **Cypress Launchpad**.

---

## STEP 5 — Configure Cypress (First Time Only)

When the Cypress Launchpad opens, you will see two options:

```
+---------------------------+---------------------------+
|                           |                           |
|      E2E Testing          |   Component Testing       |
|                           |                           |
+---------------------------+---------------------------+
```

**Click on "E2E Testing"** (the left box)

---

## STEP 6 — Choose a Browser

After clicking E2E Testing, Cypress will show you a list of browsers installed on your computer. You will see something like:

```
Chrome       ← CLICK THIS ONE
Edge
Electron
```

**Click on "Chrome"**, then click the button **"Start E2E Testing in Chrome"**

A Chrome browser window will now open automatically with the Cypress panel on the left side.

---

## STEP 7 — Run Task 1 Tests

You will now see a list of spec files on the screen:

```
cypress/e2e/
  task1/
    login.cy.js
    navigation.cy.js
    form.cy.js
  task2/
    assertions_aliases_commands.cy.js
```

### Run Login Tests

1. **Click on `login.cy.js`** (under task1 folder)
2. The tests will start running automatically
3. Wait for all 3 tests to finish
4. You should see:
   ```
   Login Tests
     ✓  Login Test 1: Valid credentials should redirect to products dashboard
     ✓  Login Test 2: Invalid password should show error message
     ✓  Login Test 3: Empty fields should show validation message
   ```
5. **Take a screenshot** now — press `Win + Shift + S` and drag to select the Cypress window

### Run Navigation Tests

1. Click the **back arrow** at the top left of the Cypress panel (or click "Specs" in the sidebar)
2. **Click on `navigation.cy.js`** (under task1 folder)
3. Wait for 2 tests to finish
4. You should see:
   ```
   Navigation Tests
     ✓  Navigation Test 1: Clicking cart icon should open the cart page
     ✓  Navigation Test 2: Visit Products page then About page via burger menu
   ```
5. Take a screenshot

### Run Form Test

1. Click back to Specs list
2. **Click on `form.cy.js`** (under task1 folder)
3. Wait for the test to finish
4. You should see:
   ```
   Form Test
     ✓  Form Test 1: Fill checkout form and assert order confirmation
   ```
5. Take a screenshot
6. This test also saves an automatic screenshot inside `cypress/screenshots/` folder

---

## STEP 8 — Run Task 2 Tests

1. Click back to Specs list
2. **Click on `assertions_aliases_commands.cy.js`** (under task2 folder)
3. Wait for all tests to finish
4. You should see:
   ```
   Assertion Practice
     ✓  Assertion 1: Page title should be visible
     ✓  Assertion 2: App logo should have exact text "Swag Labs"
     ✓  Assertion 3: Twitter icon link should have correct href attribute
     ✓  Negative Assertion: Error message should not exist on successful login

   Alias Practice
     ✓  Save cart badge as alias and assert it updates after adding a product

   Custom Command — login()
     ✓  Custom login command should log in and land on the products page
     ✓  Custom logout command should return to the login page

   Bonus — Extra Practice
     ✓  Product image should be visible on the inventory page
     ✓  Sort dropdown selects "Price (low to high)" and first item price updates
     ✓  cy.contains() finds Add to Cart button by text
     ✓  Screenshot captured during inventory page visit
   ```
5. Take a screenshot of the full results

---

## STEP 9 — Run ALL Tests at Once (For Final Screenshot)

1. Go back to the Specs list
2. At the top of the spec list, look for a button that says **"Run all specs"**
3. Click it
4. All 4 spec files will run one after another automatically
5. When everything finishes, take a final screenshot showing all tests passed

---

## What the Icons Mean

| Icon | Color | Meaning |
|------|-------|---------|
| ✓ | Green | Test PASSED |
| ✗ | Red | Test FAILED |
| ○ (spinning) | Blue | Test is currently running — wait |
| ○ (empty) | Gray | Test has not run yet |

---

## Where to Find Auto-Saved Screenshots

After running the form test and Task 2 tests, Cypress saves screenshots automatically here:

```
cypress-project/
└── cypress/
    └── screenshots/
        ├── form.cy.js/
        │   └── order-confirmation.png
        └── assertions_aliases_commands.cy.js/
            └── inventory-page.png
```

Open File Explorer → navigate to the project folder → open `cypress` → open `screenshots`

---

## If a Test Shows Red (Failed) — Common Fixes

| Error Message | What to Do |
|---|---|
| `Timed out waiting for page to load` | Your internet is slow — wait and click the retry button (circular arrow) |
| `Expected to find element but never found it` | The website changed — tell your instructor |
| `Cannot read properties of undefined` | Re-run the test by clicking the spec file again |

---

## Task 1 — What Each Test Does

| File | Test | What it checks |
|---|---|---|
| `login.cy.js` | Login Test 1 | Logs in with correct username/password — checks dashboard appears |
| `login.cy.js` | Login Test 2 | Logs in with wrong password — checks error message appears |
| `login.cy.js` | Login Test 3 | Clicks login with empty fields — checks validation message appears |
| `navigation.cy.js` | Navigation Test 1 | Clicks cart icon — checks cart page opens |
| `navigation.cy.js` | Navigation Test 2 | Opens burger menu — checks About link is present |
| `form.cy.js` | Form Test 1 | Fills checkout form completely — checks order confirmation appears |

---

## Task 2 — What Each Test Does

| Test | Cypress Feature Used |
|---|---|
| Assertion 1 — title is visible | `cy.should('be.visible')` |
| Assertion 2 — logo text matches | `cy.should('have.text', '...')` |
| Assertion 3 — link has correct href | `cy.should('have.attr', '...')` |
| Negative Assertion | `cy.should('not.exist')` |
| Alias Practice | `.as('name')` and `cy.get('@name')` |
| Custom Command | `cy.login()` defined in `commands.js` |
| Bonus tests | `cy.screenshot()`, `cy.contains()`, dropdown select |

---

## Reflection — What I Found Difficult (Task 2)

The most challenging part of Task 2 was understanding **aliases** (`cy.get(...).as()`). At first I tried reusing an alias across `describe` blocks, which failed because aliases are scoped to the current test. I solved this by moving the `.as()` call inside the same `it()` block where I needed to reuse the element, and by reading the Cypress docs on subject management. Once I understood that an alias is essentially a named reference tied to the current test's command queue, the pattern clicked and it became a clean way to avoid repeating the same `cy.get()` selector.

---

## Test Credentials Used

| Type | Username | Password |
|---|---|---|
| Valid (should pass) | `standard_user` | `secret_sauce` |
| Invalid (should show error) | `standard_user` | `wrong_password` |
