# Code Guide — Every File, Every Test, Every Function
## CSE482 Software Testing | Cypress Project | Mudasar Ahmad | FA22-BSE-057

---

## HOW THE PROJECT IS ORGANISED

```
cypress-project/
├── cypress.config.js                          ← Global settings for Cypress
├── package.json                               ← Project dependencies (Cypress version etc.)
├── cypress/
│   ├── support/
│   │   ├── e2e.js                             ← Auto-loaded before every test
│   │   └── commands.js                        ← Custom command definitions
│   ├── e2e/
│   │   ├── task1/
│   │   │   ├── login.cy.js                    ← 3 login tests
│   │   │   ├── navigation.cy.js               ← 2 navigation tests
│   │   │   └── form.cy.js                     ← 1 form test
│   │   └── task2/
│   │       └── assertions_aliases_commands.cy.js  ← All Task 2 tests
│   └── screenshots/                           ← PNG files saved by cy.screenshot()
```

---

## FILE 1 — `cypress.config.js`

### Full Code:
```js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://the-internet.herokuapp.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    setupNodeEvents(on, config) {},
  },
})
```

### Line-by-line explanation:

**`const { defineConfig } = require('cypress')`**
Imports the `defineConfig` helper function from the Cypress package. This function provides autocomplete and type checking for config options.

**`module.exports = defineConfig({...})`**
Exports the configuration object so Cypress can read it when it starts.

**`e2e: { ... }`**
All settings inside this block apply to E2E tests specifically (as opposed to Component tests).

**`baseUrl: 'https://the-internet.herokuapp.com'`**
Sets the root domain for the site being tested. Every `cy.visit('/login')` in a test becomes `cy.visit('https://the-internet.herokuapp.com/login')` automatically. You only need to update this one line if the domain changes.

**`viewportWidth: 1280` and `viewportHeight: 720`**
Sets the browser window size for all tests. 1280×720 is standard HD resolution. Using a fixed size ensures consistent screenshots and element positions across different machines.

**`video: false`**
Disables video recording when running `cypress run` (headless mode). Videos take disk space and slow down CI runs. We disabled it since screenshots are sufficient.

**`screenshotOnRunFailure: true`**
When any test fails, Cypress automatically saves a screenshot of the browser at that exact moment. This is essential for debugging failures in headless (CI) mode where there is no visible browser.

**`defaultCommandTimeout: 10000`**
Cypress waits up to 10,000 milliseconds (10 seconds) for any command to succeed before failing. For example, if `cy.get('#username')` can't find the element, it retries every few milliseconds for up to 10 seconds.

**`pageLoadTimeout: 60000`**
Cypress waits up to 60 seconds for a page to fully load (fire its `load` event) after `cy.visit()`. Increased from the default 4 seconds to handle slower network connections.

**`setupNodeEvents(on, config) {}`**
A hook for registering Node.js plugins and event listeners. Left empty because our project does not need any plugins.

---

## FILE 2 — `cypress/support/e2e.js`

### Full Code:
```js
import './commands'

Cypress.on('uncaught:exception', () => false)
```

### Line-by-line explanation:

**`import './commands'`**
Imports the `commands.js` file. Cypress automatically loads `e2e.js` before every single test. By importing `commands.js` here, all custom commands (`cy.login()`, `cy.logout()`) are registered globally and available in every spec file without needing individual imports.

**`Cypress.on('uncaught:exception', () => false)`**
Registers a global event listener. When the website's own JavaScript throws an unhandled error (like from the Optimizely analytics script on the-internet.herokuapp.com), Cypress would normally fail the test. By returning `false` from this handler, we tell Cypress: "ignore this error, it is from the website itself, not from our test."

---

## FILE 3 — `cypress/support/commands.js`

### Full Code:
```js
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login')
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('logout', () => {
  cy.get('a[href="/logout"]').click()
  cy.url().should('include', '/login')
})
```

### Line-by-line explanation:

---

#### Custom Command 1 — `cy.login()`

**`Cypress.Commands.add('login', (username, password) => { ... })`**
Registers a new Cypress command called `login`. After this line runs (at startup), any test file can call `cy.login()` just like a built-in command. The function receives `username` and `password` as parameters.

**`cy.visit('/login')`**
Navigates to the login page. Uses baseUrl so the full URL is `https://the-internet.herokuapp.com/login`.

**`cy.get('#username').type(username)`**
Finds the input field with `id="username"` and types whatever was passed as the `username` parameter.

**`cy.get('#password').type(password)`**
Finds the input field with `id="password"` and types the `password` parameter.

**`cy.get('button[type="submit"]').click()`**
Finds a `<button>` element that has the attribute `type="submit"` and clicks it to submit the login form.

**How to use in a test:**
```js
cy.login('tomsmith', 'SuperSecretPassword!')
// This one line replaces these 4 lines:
// cy.visit('/login')
// cy.get('#username').type('tomsmith')
// cy.get('#password').type('SuperSecretPassword!')
// cy.get('button[type="submit"]').click()
```

---

#### Custom Command 2 — `cy.logout()`

**`Cypress.Commands.add('logout', () => { ... })`**
Registers a command called `logout`. No parameters needed.

**`cy.get('a[href="/logout"]').click()`**
Finds the `<a>` anchor element whose `href` attribute is exactly `/logout` and clicks it. This is the logout link shown on the secure area page.

**`cy.url().should('include', '/login')`**
After clicking logout, asserts that the browser navigated back to the login page. This assertion is INSIDE the command itself — so any test using `cy.logout()` automatically gets this assertion for free.

---

## FILE 4 — `cypress/e2e/task1/login.cy.js`

### Full Code:
```js
describe('Login Tests', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('Login Test 1: Valid credentials should redirect to secure area', () => {
    cy.get('#username').type('tomsmith')
    cy.get('#password').type('SuperSecretPassword!')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/secure')
    cy.get('h2').should('be.visible').and('contain.text', 'Secure Area')
    cy.screenshot('login-test1-success')
  })

  it('Login Test 2: Invalid password should show error message', () => {
    cy.get('#username').type('tomsmith')
    cy.get('#password').type('wrongpassword')
    cy.get('button[type="submit"]').click()
    cy.get('#flash')
      .should('be.visible')
      .and('contain.text', 'Your password is invalid!')
    cy.screenshot('login-test2-error')
  })

  it('Login Test 3: Empty fields should show validation message', () => {
    cy.get('button[type="submit"]').click()
    cy.get('#flash')
      .should('be.visible')
      .and('contain.text', 'Your username is invalid!')
    cy.screenshot('login-test3-empty')
  })
})
```

### Test-by-test walkthrough:

---

#### `describe('Login Tests', () => { ... })`
Groups all three login tests together. In the Cypress runner, these three tests appear under the "Login Tests" heading.

---

#### `beforeEach(() => { cy.visit('/login') })`
Runs before Login Test 1, before Login Test 2, and before Login Test 3.
- Each test starts fresh on the login page
- Without this, the browser might still be on `/secure` after Test 1 passes, which would break Test 2

---

#### Login Test 1 — Valid Credentials

**Step 1:** `cy.get('#username').type('tomsmith')`
Finds the username field by its id and types the valid username.

**Step 2:** `cy.get('#password').type('SuperSecretPassword!')`
Finds the password field and types the valid password.

**Step 3:** `cy.get('button[type="submit"]').click()`
Clicks the login button. The browser submits the form and navigates to `/secure`.

**Step 4:** `cy.url().should('include', '/secure')`
Gets the current URL and asserts it contains `/secure`. This confirms navigation happened.

**Step 5:** `cy.get('h2').should('be.visible').and('contain.text', 'Secure Area')`
- Finds the `<h2>` element
- First asserts it is visible to the user
- Then asserts its text contains "Secure Area"
- `and()` chains the second assertion on the same `<h2>` element

**Step 6:** `cy.screenshot('login-test1-success')`
Saves `cypress/screenshots/login-test1-success.png`

**What this test proves:** The login system works correctly with valid credentials.

---

#### Login Test 2 — Invalid Password

**Step 1–2:** Types valid username but wrong password (`wrongpassword`).

**Step 3:** `cy.get('button[type="submit"]').click()`
Submits the form. The server rejects the credentials and shows an error.

**Step 4:**
```js
cy.get('#flash')
  .should('be.visible')
  .and('contain.text', 'Your password is invalid!')
```
- `#flash` is the id of the red error message div on the page
- Asserts it is visible (not hidden)
- Asserts it contains the expected error message text

**What this test proves:** The system correctly rejects wrong passwords and shows an appropriate error.

---

#### Login Test 3 — Empty Fields

**Step 1:** `cy.get('button[type="submit"]').click()`
Clicks login WITHOUT typing anything. No username, no password.

**Step 2:**
```js
cy.get('#flash')
  .should('be.visible')
  .and('contain.text', 'Your username is invalid!')
```
Asserts the error message says the username is invalid (because it is empty).

**What this test proves:** The form has validation — you cannot log in without entering credentials.

---

## FILE 5 — `cypress/e2e/task1/navigation.cy.js`

### Full Code:
```js
describe('Navigation Tests', () => {
  it('Navigation Test 1: Clicking Checkboxes link should open the checkboxes page', () => {
    cy.visit('/')
    cy.contains('a', 'Checkboxes').click()
    cy.url().should('include', '/checkboxes')
    cy.get('h3').should('be.visible').and('contain.text', 'Checkboxes')
    cy.screenshot('navigation-test1-checkboxes')
  })

  it('Navigation Test 2: Visit Dropdown page then Inputs page and assert headings', () => {
    cy.visit('/dropdown')
    cy.get('h3').should('be.visible').and('contain.text', 'Dropdown List')
    cy.screenshot('navigation-test2-dropdown')

    cy.visit('/inputs')
    cy.get('h3').should('be.visible').and('contain.text', 'Inputs')
    cy.screenshot('navigation-test2-inputs')
  })
})
```

### Test-by-test walkthrough:

---

#### Navigation Test 1 — Click a Menu Link

**`cy.visit('/')`**
Opens the home page which contains a list of links to all features.

**`cy.contains('a', 'Checkboxes').click()`**
- `cy.contains('a', 'Checkboxes')` searches for an `<a>` element whose visible text is "Checkboxes"
- `.click()` clicks that link
- This simulates what a real user does — reads the link text and clicks it

**`cy.url().should('include', '/checkboxes')`**
Verifies the browser navigated to the checkboxes page.

**`cy.get('h3').should('be.visible').and('contain.text', 'Checkboxes')`**
Finds the page heading `<h3>` and verifies it says "Checkboxes" — confirms we are on the right page.

**What this test proves:** Clicking a navigation link takes the user to the correct page.

---

#### Navigation Test 2 — Two Pages in Sequence

**This single test visits TWO pages:**

**First page:**
```js
cy.visit('/dropdown')
cy.get('h3').should('be.visible').and('contain.text', 'Dropdown List')
cy.screenshot('navigation-test2-dropdown')
```
Visits the dropdown page and verifies the heading.

**Second page:**
```js
cy.visit('/inputs')
cy.get('h3').should('be.visible').and('contain.text', 'Inputs')
cy.screenshot('navigation-test2-inputs')
```
Navigates to the inputs page and verifies its heading.

**Why two `cy.visit()` calls in one test?**
The lab requirement asks to "visit 2 different pages in sequence and assert each page has the correct heading." This test does exactly that — visits page 1, checks it, then visits page 2, checks it.

---

## FILE 6 — `cypress/e2e/task1/form.cy.js`

### Full Code:
```js
describe('Form Test', () => {
  it('Form Test 1: Fill login form and assert successful secure area entry', () => {
    cy.visit('/login')
    cy.get('#username').type('tomsmith')
    cy.get('#password').type('SuperSecretPassword!')
    cy.screenshot('form-test1-before-submit')
    cy.get('button[type="submit"]').click()
    cy.get('#flash')
      .should('be.visible')
      .and('contain.text', 'You logged into a secure area!')
    cy.get('h2').should('be.visible').and('contain.text', 'Secure Area')
    cy.screenshot('form-test1-after-submit')
  })
})
```

### Step-by-step walkthrough:

**`cy.visit('/login')`** — Opens login page (no beforeEach here, so visit is in the test itself)

**`cy.get('#username').type('tomsmith')`** — Fills username field

**`cy.get('#password').type('SuperSecretPassword!')`** — Fills password field

**`cy.screenshot('form-test1-before-submit')`** — Captures the form BEFORE clicking submit. This proves the form was filled correctly.

**`cy.get('button[type="submit"]').click()`** — Submits the form

**`cy.get('#flash').should('be.visible').and('contain.text', 'You logged into a secure area!')`**
Verifies the green success flash message is shown. `#flash` is the message div.

**`cy.get('h2').should('be.visible').and('contain.text', 'Secure Area')`**
Verifies the secure area heading is visible.

**`cy.screenshot('form-test1-after-submit')`** — Captures the result AFTER submit. Shows the confirmation page.

**What this test proves:** The complete form submission workflow functions correctly end to end.

---

## FILE 7 — `cypress/e2e/task2/assertions_aliases_commands.cy.js`

This file contains all Task 2 exercises. It has 4 describe blocks.

### Full Code:
```js
describe('Assertion Practice', () => {
  beforeEach(() => { cy.visit('/') })

  it('Assertion 1: Main heading should be visible on the home page', () => {
    cy.get('h1').should('be.visible')
    cy.screenshot('assertion1-heading-visible')
  })

  it('Assertion 2: Page heading should have exact text "Welcome to the-internet"', () => {
    cy.get('h1').should('contain.text', 'Welcome to the-internet')
    cy.screenshot('assertion2-heading-text')
  })

  it('Assertion 3: GitHub fork ribbon link should have correct href attribute', () => {
    cy.get('a[href="https://github.com/tourdedave/the-internet"]')
      .should('have.attr', 'href', 'https://github.com/tourdedave/the-internet')
    cy.screenshot('assertion3-href-attribute')
  })

  it('Negative Assertion: A non-existent element should not exist on the page', () => {
    cy.get('#this-element-does-not-exist').should('not.exist')
    cy.screenshot('assertion4-negative')
  })
})

describe('Alias Practice', () => {
  it('Save dropdown element as alias and assert selected option changes', () => {
    cy.visit('/dropdown')
    cy.get('#dropdown').as('myDropdown')
    cy.get('@myDropdown').should('be.visible')
    cy.get('@myDropdown').select('1')
    cy.get('@myDropdown').should('have.value', '1')
    cy.get('@myDropdown').select('2')
    cy.get('@myDropdown').should('have.value', '2')
    cy.screenshot('alias-dropdown-selected')
  })
})

describe('Custom Command — login()', () => {
  it('Custom login command should log in and land on the secure area', () => {
    cy.login('tomsmith', 'SuperSecretPassword!')
    cy.url().should('include', '/secure')
    cy.get('h2').should('contain.text', 'Secure Area')
    cy.screenshot('custom-command-login')
  })

  it('Custom logout command should return to the login page', () => {
    cy.login('tomsmith', 'SuperSecretPassword!')
    cy.logout()
    cy.url().should('include', '/login')
    cy.get('button[type="submit"]').should('be.visible')
    cy.screenshot('custom-command-logout')
  })
})

describe('Bonus — Extra Practice', () => {
  it('Login button should be visible on the login page', () => {
    cy.visit('/login')
    cy.get('button[type="submit"]').should('be.visible')
    cy.screenshot('bonus-button-visible')
  })

  it('Dropdown: select option and assert page updates correctly', () => {
    cy.visit('/dropdown')
    cy.get('#dropdown').select('Option 1')
    cy.get('#dropdown').should('have.value', '1')
    cy.screenshot('bonus-dropdown-option1')
  })

  it('cy.contains() finds link by text on the home page', () => {
    cy.visit('/')
    cy.contains('a', 'Form Authentication').should('be.visible').click()
    cy.url().should('include', '/login')
    cy.screenshot('bonus-contains-link')
  })

  it('Screenshot captured during home page visit', () => {
    cy.visit('/')
    cy.get('h1').should('be.visible')
    cy.screenshot('bonus-home-page')
  })
})
```

---

### DESCRIBE BLOCK 1 — Assertion Practice

**`beforeEach(() => { cy.visit('/') })`**
Visits the home page before each of the 4 tests in this block.

---

#### Assertion Test 1 — `be.visible`

```js
cy.get('h1').should('be.visible')
```
- Finds the `<h1>` element (main heading of the home page)
- Asserts it is visible — meaning it is in the viewport, not hidden with CSS
- `be.visible` checks: element exists AND is not hidden AND is in the viewport

---

#### Assertion Test 2 — `contain.text`

```js
cy.get('h1').should('contain.text', 'Welcome to the-internet')
```
- Finds `<h1>` and checks its text contains "Welcome to the-internet"
- `contain.text` passes even if there is extra whitespace around the text
- Different from `have.text` which requires an exact character match

---

#### Assertion Test 3 — `have.attr`

```js
cy.get('a[href="https://github.com/tourdedave/the-internet"]')
  .should('have.attr', 'href', 'https://github.com/tourdedave/the-internet')
```
- Selector `a[href="..."]` finds the anchor element by its href attribute value
- `.should('have.attr', 'href', 'https://...')` asserts the href attribute equals that exact URL
- This pattern is used to verify links point to the correct destination

---

#### Negative Assertion — `not.exist`

```js
cy.get('#this-element-does-not-exist').should('not.exist')
```
- Tries to find `#this-element-does-not-exist` in the DOM
- `not.exist` asserts that NO element with this id exists anywhere in the page's HTML
- Cypress does NOT retry this indefinitely — it checks if it's absent and passes immediately
- Different from `not.be.visible`: not.exist = no HTML at all; not.be.visible = HTML exists but hidden

---

### DESCRIBE BLOCK 2 — Alias Practice

```js
cy.visit('/dropdown')

cy.get('#dropdown').as('myDropdown')
```
- Finds the `<select>` dropdown element with `id="dropdown"`
- `.as('myDropdown')` saves it under the name "myDropdown"
- From this point, `cy.get('@myDropdown')` retrieves that element without hitting the DOM again

```js
cy.get('@myDropdown').should('be.visible')
```
- Uses the alias `@myDropdown` (note the `@` prefix)
- Asserts the dropdown is visible

```js
cy.get('@myDropdown').select('1')
cy.get('@myDropdown').should('have.value', '1')
```
- `.select('1')` selects the option whose `value` attribute is `"1"`
- `.should('have.value', '1')` asserts the dropdown now has value `"1"`

```js
cy.get('@myDropdown').select('2')
cy.get('@myDropdown').should('have.value', '2')
```
- Reuses the same alias to change the selection to option `"2"`
- Demonstrates the core benefit of aliases: write the selector once, use it many times

---

### DESCRIBE BLOCK 3 — Custom Command Tests

#### Test 1 — Custom cy.login()

```js
cy.login('tomsmith', 'SuperSecretPassword!')
```
- Calls the custom command defined in `commands.js`
- Internally this runs: visit('/login'), type username, type password, click submit
- After this line, the browser is on `/secure`

```js
cy.url().should('include', '/secure')
cy.get('h2').should('contain.text', 'Secure Area')
```
Verifies the custom command worked correctly.

---

#### Test 2 — Custom cy.logout()

```js
cy.login('tomsmith', 'SuperSecretPassword!')
cy.logout()
```
- First logs in using the custom command
- Then logs out using another custom command
- `cy.logout()` internally: finds the logout link, clicks it, asserts URL goes to /login

```js
cy.url().should('include', '/login')
cy.get('button[type="submit"]').should('be.visible')
```
Additional assertions after logout to confirm the login page is shown.

---

### DESCRIBE BLOCK 4 — Bonus Tests

#### Bonus Test 1 — Visible Button Check
```js
cy.visit('/login')
cy.get('button[type="submit"]').should('be.visible')
```
Confirms the login button is rendered and visible.

#### Bonus Test 2 — Dropdown Select by Text
```js
cy.get('#dropdown').select('Option 1')
cy.get('#dropdown').should('have.value', '1')
```
Shows that `.select()` accepts the visible option text ("Option 1") as well as the value ("1").

#### Bonus Test 3 — cy.contains() Navigation
```js
cy.contains('a', 'Form Authentication').should('be.visible').click()
cy.url().should('include', '/login')
```
- Finds the link labelled "Form Authentication" on the home page
- Asserts it is visible, then clicks it
- Verifies the URL changes to `/login`
- Demonstrates cy.contains() for navigation by readable text

#### Bonus Test 4 — Screenshot
```js
cy.get('h1').should('be.visible')
cy.screenshot('bonus-home-page')
```
Confirms heading is visible then captures the page.

---

## COMPLETE CYPRESS FUNCTION REFERENCE

Every function used in this project:

| Function | File(s) used in | What it does |
|---|---|---|
| `describe(label, fn)` | All spec files | Groups tests into a named suite |
| `it(label, fn)` | All spec files | Defines a single test case |
| `beforeEach(fn)` | login.cy.js, assertions_aliases_commands.cy.js | Runs before each test in the same describe |
| `cy.visit(path)` | All spec files | Opens a URL in the browser |
| `cy.get(selector)` | All spec files | Finds element(s) by CSS selector |
| `cy.contains(tag, text)` | navigation.cy.js, assertions_aliases_commands.cy.js | Finds element by visible text |
| `.type(text)` | login.cy.js, form.cy.js, commands.js | Types text into an input field |
| `.click()` | All spec files | Clicks an element |
| `.select(value)` | assertions_aliases_commands.cy.js | Selects option from a dropdown |
| `.should(assertion, ...args)` | All spec files | Makes an assertion on the current subject |
| `.and(assertion, ...args)` | All spec files | Chains a second assertion on same subject |
| `cy.url()` | All spec files | Gets the current browser URL |
| `cy.screenshot(name)` | All spec files | Saves a PNG screenshot |
| `.as(name)` | assertions_aliases_commands.cy.js | Saves current subject as an alias |
| `cy.get('@name')` | assertions_aliases_commands.cy.js | Retrieves a saved alias |
| `cy.login(u, p)` | assertions_aliases_commands.cy.js | Custom command — login flow |
| `cy.logout()` | assertions_aliases_commands.cy.js | Custom command — logout flow |
| `Cypress.Commands.add(name, fn)` | commands.js | Registers a new custom command |
| `Cypress.on('uncaught:exception', fn)` | e2e.js | Global error event handler |
| `import './commands'` | e2e.js | Loads the commands file globally |
| `defineConfig({...})` | cypress.config.js | Defines Cypress configuration |

---

## ASSERTION REFERENCE — Every `.should()` used

| Assertion String | Used In | What it checks |
|---|---|---|
| `'be.visible'` | All files | Element is rendered and visible in the viewport |
| `'contain.text', 'string'` | All files | Element's text includes this string (whitespace-tolerant) |
| `'have.text', 'string'` | — | Exact text match (NOT used — we use contain.text instead) |
| `'have.attr', 'attr', 'value'` | assertions_aliases_commands.cy.js | Element has attribute with specific value |
| `'have.value', 'value'` | assertions_aliases_commands.cy.js | Input/select currently has this value |
| `'include', 'string'` | All files (with cy.url()) | URL string contains this substring |
| `'not.exist'` | assertions_aliases_commands.cy.js | Element is completely absent from the DOM |

---

## CSS SELECTOR REFERENCE — Every `cy.get()` selector used

| Selector | HTML it targets | Example |
|---|---|---|
| `#username` | `<input id="username">` | Username field |
| `#password` | `<input id="password">` | Password field |
| `button[type="submit"]` | `<button type="submit">` | Submit/Login button |
| `h1` | `<h1>` element | Page main heading |
| `h2` | `<h2>` element | Section heading |
| `h3` | `<h3>` element | Sub-heading |
| `#flash` | `<div id="flash">` | Flash notification message |
| `#dropdown` | `<select id="dropdown">` | Dropdown select element |
| `a[href="/logout"]` | `<a href="/logout">` | Logout link |
| `a[href="https://github.com/..."]` | Anchor with full href | GitHub link |
| `#this-element-does-not-exist` | Does not exist | Used for not.exist negative test |

---

## SCREENSHOTS GENERATED — Full List

| Screenshot file | Created in | When it is taken |
|---|---|---|
| `login-test1-success.png` | login.cy.js Test 1 | After successful login |
| `login-test2-error.png` | login.cy.js Test 2 | After invalid password error appears |
| `login-test3-empty.png` | login.cy.js Test 3 | After empty submit validation appears |
| `navigation-test1-checkboxes.png` | navigation.cy.js Test 1 | After checkboxes page opens |
| `navigation-test2-dropdown.png` | navigation.cy.js Test 2 | On dropdown page |
| `navigation-test2-inputs.png` | navigation.cy.js Test 2 | On inputs page |
| `form-test1-before-submit.png` | form.cy.js | Form filled, before clicking submit |
| `form-test1-after-submit.png` | form.cy.js | After form submitted, confirmation shown |
| `assertion1-heading-visible.png` | Task 2 Assertion 1 | be.visible assertion passed |
| `assertion2-heading-text.png` | Task 2 Assertion 2 | contain.text assertion passed |
| `assertion3-href-attribute.png` | Task 2 Assertion 3 | have.attr assertion passed |
| `assertion4-negative.png` | Task 2 Negative Assertion | not.exist assertion passed |
| `alias-dropdown-selected.png` | Task 2 Alias | Dropdown value changed using alias |
| `custom-command-login.png` | Task 2 Custom Command | cy.login() command result |
| `custom-command-logout.png` | Task 2 Custom Command | cy.logout() command result |
| `bonus-button-visible.png` | Task 2 Bonus | Button visibility confirmed |
| `bonus-dropdown-option1.png` | Task 2 Bonus | Dropdown option selected |
| `bonus-contains-link.png` | Task 2 Bonus | cy.contains() navigation |
| `bonus-home-page.png` | Task 2 Bonus | Home page captured |
