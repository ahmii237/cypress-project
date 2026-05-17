# Viva Preparation Guide — CSE482 Software Testing
## Cypress End-to-End Testing | Mudasar Ahmad | FA22-BSE-057

---

## SECTION 1 — What is Cypress and Why Did We Use It?

**Cypress** is a JavaScript-based End-to-End (E2E) testing framework that runs directly inside the browser. Unlike older tools like Selenium, Cypress does not use WebDriver — it runs in the same execution loop as the application being tested.

### Why Cypress was chosen:
| Reason | Explanation |
|---|---|
| Runs in the browser | Tests execute in real browser environment, not a simulated one |
| No driver setup | No need to install ChromeDriver or GeckoDriver separately |
| Automatic waiting | Cypress automatically waits for elements before interacting — no manual sleep() calls |
| Real-time reloading | When you save a test file, the browser re-runs the test instantly |
| Built-in screenshots | cy.screenshot() saves PNG files without any extra library |
| Clear error messages | When a test fails, Cypress shows the exact command that failed with a screenshot |

---

## SECTION 2 — What is E2E Testing?

**End-to-End Testing** means testing a complete user workflow from start to finish — just like a real user would use the application. Instead of testing a single function in isolation (unit test), E2E tests open a browser, click buttons, fill forms, and verify results.

**Example from our project:**
A user visits the login page → types username and password → clicks Login → lands on the secure area. Our test automates exactly this sequence and checks that every step produces the correct result.

---

## SECTION 3 — Website Used and Why

**Website:** `https://the-internet.herokuapp.com`

**Why this site?**
- It is a purpose-built QA practice site — designed specifically for automated testing
- No tracking scripts or third-party analytics that could interfere with tests
- Has login, forms, dropdowns, navigation — all elements needed for the lab tasks
- Loads in under 3 seconds — no timeout issues
- Freely accessible, no account needed

**Login credentials used:**
- Valid: `tomsmith` / `SuperSecretPassword!`
- Invalid: `tomsmith` / `wrongpassword`

---

## SECTION 4 — Every Cypress Concept Used and WHY

---

### 4.1 `describe()`

**What it is:** A block that groups related tests together under one name.

**Why we used it:**
We used `describe()` to organise tests logically — all login tests go inside one `describe('Login Tests')`, all navigation tests inside `describe('Navigation Tests')`, etc. Without describe, all tests would appear as a flat list with no grouping.

**Syntax:**
```js
describe('Login Tests', () => {
  // all login-related tests go here
})
```

**Viva answer:** "describe() is a test suite container. It groups related it() blocks together. It makes output easier to read and helps organise the test file logically."

---

### 4.2 `it()`

**What it is:** A single test case. Each it() block tests one specific behaviour.

**Why we used it:**
Each test case in the lab requirement — Login Test 1, Login Test 2, etc. — became one it() block. The string inside it() describes what the test verifies, so when it passes or fails, the message is human-readable.

**Syntax:**
```js
it('Valid credentials should redirect to secure area', () => {
  // test steps
})
```

**Viva answer:** "it() defines a single test case. The first argument is the test description (shown in the Cypress runner). The second argument is the function containing the test steps."

---

### 4.3 `beforeEach()`

**What it is:** A hook that runs automatically before every `it()` block inside the same `describe()`.

**Why we used it:**
In the Login Tests, every single test needed to start on the `/login` page. Instead of writing `cy.visit('/login')` three times (once in each test), we put it once in `beforeEach()`. This follows the DRY principle (Don't Repeat Yourself).

**Where we used it:**
- `login.cy.js` — visits `/login` before each of the 3 tests
- All `describe()` blocks in `assertions_aliases_commands.cy.js` — visits `/` before each test

**Syntax:**
```js
beforeEach(() => {
  cy.visit('/login')
})
```

**Viva answer:** "beforeEach() is a lifecycle hook that runs before each test in its describe block. We used it to navigate to the starting page before every test so we don't repeat cy.visit() in each it() block."

---

### 4.4 `cy.visit()`

**What it is:** Opens a URL in the browser. This is how every test begins.

**Why we used it:**
Every test needs to start on a specific page. `cy.visit()` tells Cypress which page to open. We used the `baseUrl` setting in `cypress.config.js` so we only need to write the path (e.g., `/login`) instead of the full URL.

**How it works:**
```js
cy.visit('/login')
// Cypress opens: https://the-internet.herokuapp.com/login
// (baseUrl is prepended automatically from cypress.config.js)
```

**Options we used:**
- `cy.visit('/login')` — visits the login page
- `cy.visit('/')` — visits the home page
- `cy.visit('/dropdown')` — visits the dropdown page

**Viva answer:** "cy.visit() navigates the browser to a given URL. Since we configured baseUrl in cypress.config.js, we only pass the path. Cypress waits for the page to fully load before moving to the next command."

---

### 4.5 `cy.get()`

**What it is:** Finds one or more DOM elements using a CSS selector. This is the most-used Cypress command.

**Why we used it:**
Before we can type in a field, click a button, or check text, we need to find the element first. `cy.get()` is how we locate elements on the page.

**Selectors we used:**
| Selector | What it targets | Example |
|---|---|---|
| `#username` | Element with id="username" | `cy.get('#username')` |
| `#password` | Element with id="password" | `cy.get('#password')` |
| `button[type="submit"]` | Button with type=submit | `cy.get('button[type="submit"]')` |
| `h1`, `h2`, `h3` | Heading elements | `cy.get('h2')` |
| `#flash` | Flash message div | `cy.get('#flash')` |
| `#dropdown` | Select dropdown element | `cy.get('#dropdown')` |
| `a[href="/logout"]` | Anchor with specific href | `cy.get('a[href="/logout"]')` |
| `#this-element-does-not-exist` | Non-existent element (for negative test) | used with `not.exist` |

**Viva answer:** "cy.get() queries the DOM for elements using CSS selectors. It automatically retries until the element is found or the timeout is reached. It is the primary way to locate elements before interacting with them."

---

### 4.6 `cy.contains()`

**What it is:** Finds an element by its visible text content, not by a CSS selector.

**Why we used it:**
In `navigation.cy.js`, we needed to click the "Checkboxes" link on the home page. Instead of finding its CSS class or id, we simply searched for the text "Checkboxes" — which is more readable and closer to how a real user would identify a link.

**How it works:**
```js
cy.contains('a', 'Checkboxes').click()
// Finds the <a> element whose text is "Checkboxes" and clicks it
```

**Two forms:**
```js
cy.contains('Checkboxes')           // finds ANY element with text "Checkboxes"
cy.contains('a', 'Checkboxes')      // finds specifically an <a> with that text
cy.contains('a', 'Form Authentication').should('be.visible').click()
```

**Viva answer:** "cy.contains() finds elements by their text content instead of a CSS selector. It is useful when you know what text an element has but not its exact class or id. We used it to click links by their label."

---

### 4.7 `.type()`

**What it is:** Types a string into an input field — simulates keyboard input.

**Why we used it:**
To fill in the username and password fields during login and form tests.

**How it works:**
```js
cy.get('#username').type('tomsmith')
// Clicks the field and types each character one by one
```

**Viva answer:** "type() simulates keyboard input on a text field. It dispatches key events for each character. It is chained after cy.get() once an input element is found."

---

### 4.8 `.click()`

**What it is:** Simulates a mouse click on an element.

**Why we used it:**
To click the Login button, the Checkboxes menu link, and the logout link.

**How it works:**
```js
cy.get('button[type="submit"]').click()
```

**Viva answer:** "click() fires a mousedown, mouseup, and click event on the element. It is used to interact with buttons, links, and any clickable element."

---

### 4.9 `.select()`

**What it is:** Selects an option from a `<select>` dropdown element.

**Why we used it:**
In the alias practice test and bonus tests, we needed to select values from the dropdown on `/dropdown`. You cannot use `.click()` on a dropdown option — `.select()` is the correct Cypress command.

**Two ways to use it:**
```js
cy.get('#dropdown').select('1')          // select by option value
cy.get('#dropdown').select('Option 1')   // select by option text
```

**Viva answer:** "select() is used to choose an option from an HTML <select> element. You can pass either the option value or visible text. It triggers the change event on the dropdown."

---

### 4.10 `.should()`

**What it is:** Makes an assertion — checks that the element or value meets a condition. If it does not, the test fails.

**Why we used it:**
Every test needs to verify something. `.should()` is how we express what we expect the page to look like after an action.

**Every assertion type we used:**

| Assertion | What it checks | Code example |
|---|---|---|
| `'be.visible'` | Element is visible in the viewport | `.should('be.visible')` |
| `'contain.text', '...'` | Element's text includes this string | `.should('contain.text', 'Secure Area')` |
| `'have.text', '...'` | Element's text exactly matches | `.should('have.text', 'exact match')` |
| `'have.attr', 'href', '...'` | Element has this attribute with this value | `.should('have.attr', 'href', 'https://...')` |
| `'have.value', '...'` | Input/select has this current value | `.should('have.value', '1')` |
| `'include', '...'` | String includes a substring (used with cy.url()) | `cy.url().should('include', '/secure')` |
| `'not.exist'` | Element does not exist in the DOM at all | `.should('not.exist')` |
| `'not.be.visible'` | Element exists but is hidden | `.should('not.be.visible')` |

**Difference between `contain.text` and `have.text`:**
- `have.text` — must be an exact, character-perfect match including spaces
- `contain.text` — passes if the text is anywhere inside the element (handles leading/trailing spaces)

We switched to `contain.text` because the site's headings had leading whitespace that caused `have.text` to fail.

**Viva answer:** "should() makes an assertion on the subject. Cypress retries the assertion automatically for up to the defaultCommandTimeout (10 seconds in our config) before failing. We used seven different assertion types: be.visible, contain.text, have.text, have.attr, have.value, include, and not.exist."

---

### 4.11 `.and()`

**What it is:** Chains a second assertion on the same element. It is an alias for `.should()` when chaining.

**Why we used it:**
Instead of writing two separate `.should()` lines for the same element, `.and()` lets us chain them — making the code shorter and more readable.

**How it works:**
```js
cy.get('h2').should('be.visible').and('contain.text', 'Secure Area')
// Same as:
cy.get('h2').should('be.visible')
cy.get('h2').should('contain.text', 'Secure Area')
```

**Viva answer:** "and() is an alias for should() used to chain multiple assertions on the same element. It reads more naturally — 'should be visible AND contain text'."

---

### 4.12 `cy.url()`

**What it is:** Returns the current URL of the browser as a string.

**Why we used it:**
After clicking login, we needed to verify that the browser actually navigated to the secure area. `cy.url()` gets the current URL so we can assert it contains the expected path.

**How it works:**
```js
cy.url().should('include', '/secure')
// Checks that the current URL contains '/secure'
```

**Viva answer:** "cy.url() yields the current browser URL as a string. We chained .should('include', '/secure') to verify the page navigated to the correct route after login."

---

### 4.13 `cy.screenshot()`

**What it is:** Captures a PNG screenshot of the current browser state and saves it to `cypress/screenshots/`.

**Why we used it:**
Screenshots provide visual proof that tests ran and passed. They are required as evidence for the lab submission. We added `cy.screenshot()` in every test with a descriptive name.

**How it works:**
```js
cy.screenshot('login-test1-success')
// Saves: cypress/screenshots/login-test1-success.png
```

**Automatic screenshots:**
The `screenshotOnRunFailure: true` setting in `cypress.config.js` makes Cypress automatically take a screenshot whenever a test fails — even without a `cy.screenshot()` call.

**Viva answer:** "cy.screenshot() captures the current state of the browser and saves it as a PNG file. We called it at key moments in each test to document the result. The filename is passed as an argument and the file is saved in cypress/screenshots/."

---

### 4.14 `.as()` — Aliases

**What it is:** Saves a Cypress subject (an element, a value) under a name so it can be reused later in the same test.

**Why we used it:**
In the alias practice test, we needed to interact with the `#dropdown` element four times. Instead of writing `cy.get('#dropdown')` four times, we saved it as `@myDropdown` using `.as()` and then referred to it with `cy.get('@myDropdown')`.

**How it works:**
```js
cy.get('#dropdown').as('myDropdown')   // save with .as()
cy.get('@myDropdown').select('1')       // reuse with @
cy.get('@myDropdown').should('have.value', '1')
cy.get('@myDropdown').select('2')
cy.get('@myDropdown').should('have.value', '2')
```

**Important rule:**
Aliases are scoped to the current test (`it()` block). They are automatically destroyed after the test ends. You cannot reuse an alias in a different `it()` block.

**Viva answer:** "Aliases are created with .as('name') and accessed with cy.get('@name'). They allow you to save a reference to an element and reuse it without repeating cy.get() with the same selector. Aliases are reset after each test."

---

### 4.15 `Cypress.Commands.add()` — Custom Commands

**What it is:** Defines a new Cypress command that can be called like any built-in command (`cy.login()`, `cy.logout()`).

**Why we used it:**
Login requires 4 steps every time: visit, type username, type password, click submit. Rather than copy-pasting those 4 lines in every test, we created `cy.login()` once in `commands.js` and called it wherever needed.

**Where it is defined:** `cypress/support/commands.js`

**How it works:**
```js
// DEFINITION in commands.js:
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login')
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.get('button[type="submit"]').click()
})

// USAGE in any test file:
cy.login('tomsmith', 'SuperSecretPassword!')
```

**Commands we created:**
| Command | Purpose |
|---|---|
| `cy.login(username, password)` | Visits /login, fills credentials, submits form |
| `cy.logout()` | Clicks the logout link, asserts return to /login |

**Viva answer:** "Cypress.Commands.add() registers a new custom command that behaves exactly like a built-in Cypress command. We defined cy.login() and cy.logout() to avoid repeating the same steps in multiple tests. Custom commands are defined in cypress/support/commands.js and auto-loaded before every test."

---

### 4.16 `Cypress.on('uncaught:exception')` — Global Event Handler

**What it is:** A global listener that catches uncaught JavaScript errors thrown by the website under test.

**Why we used it:**
`the-internet.herokuapp.com` sometimes throws JavaScript errors from its own third-party scripts (like Optimizely analytics). By default, Cypress treats any uncaught exception as a test failure — even errors that have nothing to do with your test. Returning `false` from this handler tells Cypress to ignore those errors.

**How it works:**
```js
// In cypress/support/e2e.js
Cypress.on('uncaught:exception', () => false)
// Return false = don't fail the test because of this error
```

**Viva answer:** "Cypress.on('uncaught:exception') is a global event handler. By returning false from it, we prevent Cypress from failing our tests due to JavaScript errors thrown by the website's own third-party scripts, which are outside our control."

---

### 4.17 `import './commands'` — Support File Import

**What it is:** Loads the custom commands file so all commands defined in it are available in every test.

**Why we used it:**
The file `cypress/support/e2e.js` is automatically loaded by Cypress before any test runs. By putting `import './commands'` there, all our custom commands (`cy.login()`, `cy.logout()`) become available in every spec file without needing to import them individually.

**Viva answer:** "cypress/support/e2e.js is the global setup file that Cypress loads before every test. We import commands.js from it so that custom commands are registered globally and available in all spec files."

---

### 4.18 `cypress.config.js` — Configuration File

**What it is:** The main configuration file for the entire Cypress project.

**Every option we used:**

| Option | Value | Purpose |
|---|---|---|
| `baseUrl` | `https://the-internet.herokuapp.com` | Prepended to every `cy.visit()` path — we write `/login` instead of the full URL |
| `viewportWidth` | `1280` | Sets browser window width in pixels |
| `viewportHeight` | `720` | Sets browser window height in pixels |
| `video` | `false` | Disables video recording during `cypress run` to save disk space |
| `screenshotOnRunFailure` | `true` | Automatically saves a screenshot when any test fails |
| `defaultCommandTimeout` | `10000` | Cypress waits up to 10 seconds for any command to succeed before failing |
| `pageLoadTimeout` | `60000` | Cypress waits up to 60 seconds for a page to fully load |
| `setupNodeEvents` | empty function | Hook for registering Node.js plugins — left empty as not needed |

**Viva answer:** "cypress.config.js controls global settings for the test suite. The most important setting is baseUrl which allows all cy.visit() calls to use relative paths. Timeouts control how long Cypress waits before giving up on finding an element or loading a page."

---

## SECTION 5 — Task Breakdown and Purpose

### Task 1 — Why These 6 Tests?

| Test | Purpose | What it proves |
|---|---|---|
| Login Test 1 | Happy path — system works with correct input | Valid credentials grant access |
| Login Test 2 | Negative path — system rejects wrong credentials | Security — wrong password shows error |
| Login Test 3 | Boundary case — system handles empty input | Validation — form cannot be submitted blank |
| Navigation Test 1 | Link click leads to correct destination | Routing is working correctly |
| Navigation Test 2 | Multiple pages load with correct content | No pages are broken or showing wrong headings |
| Form Test 1 | Full form submission flow works end to end | Complete user journey succeeds |

### Task 2 — Why These Concepts?

| Concept | Why it matters in real projects |
|---|---|
| `be.visible` assertion | Ensures elements are actually shown to the user — not just present in HTML but hidden |
| `contain.text` assertion | Verifies correct text content is displayed — catches wrong messages or empty labels |
| `have.attr` assertion | Verifies link destinations — critical for navigation and SEO correctness |
| `not.exist` (negative) | Confirms that error messages or restricted content are NOT shown to the right users |
| Aliases | Improve test readability and reduce repeated selectors — important in large test suites |
| Custom commands | Encapsulate reusable logic — if the login flow changes, you fix it in one place |
| `beforeEach` hook | Ensures each test starts in a clean, known state — prevents test pollution |

---

## SECTION 6 — Expected Viva Questions and Answers

**Q: What is the difference between cy.get() and cy.contains()?**
A: cy.get() finds elements by CSS selector (id, class, tag, attribute). cy.contains() finds elements by their visible text content. Use cy.get() when you know the element's selector; use cy.contains() when you know what text the user sees.

**Q: What is the difference between should() and and()?**
A: They are functionally identical — and() is just an alias for should() used when chaining multiple assertions on the same element for better readability.

**Q: What happens if cy.get() cannot find the element?**
A: Cypress automatically retries the query every few milliseconds until either the element appears or the defaultCommandTimeout (10 seconds in our project) expires. If still not found, the test fails with a timeout error.

**Q: What is beforeEach() and when should you use it?**
A: beforeEach() runs before every it() in the same describe(). Use it when every test in a group needs the same setup — like visiting a page, logging in, or resetting state.

**Q: What is the purpose of baseUrl in cypress.config.js?**
A: It sets the root URL for the site being tested. Once set, you write cy.visit('/login') instead of cy.visit('https://the-internet.herokuapp.com/login') everywhere. If the domain changes, you update it in one place.

**Q: Why did you use custom commands instead of repeating the login steps?**
A: Custom commands follow the DRY (Don't Repeat Yourself) principle. If the login flow changes (e.g., a new 2FA field is added), we update cy.login() in commands.js once instead of updating every test file.

**Q: What is an alias in Cypress?**
A: An alias saves a Cypress subject (element, response, value) under a name using .as('name'). It can then be retrieved with cy.get('@name') anywhere in the same test. Aliases reset after each it() block.

**Q: What is the difference between not.exist and not.be.visible?**
A: not.exist means the element is completely absent from the DOM (no HTML for it at all). not.be.visible means the element exists in the HTML but is hidden (e.g., display:none or off-screen).

**Q: Why is screenshotOnRunFailure useful?**
A: When a test fails during CI/CD (automated runs with no browser window), you cannot see what happened. Automatic screenshots capture exactly what the page looked like at the moment of failure, making debugging much easier.

**Q: What is the Cypress test runner?**
A: It is the interactive GUI opened by `npx cypress open`. It shows all spec files, lets you click to run them, shows each command as it executes in a timeline on the left, and renders the live browser on the right.

**Q: What is E2E testing and how is it different from unit testing?**
A: E2E testing tests a complete user workflow through the entire application (browser → frontend → backend → database). Unit testing tests a single function or component in isolation. E2E tests are slower but catch integration bugs that unit tests miss.

**Q: What does Cypress.on('uncaught:exception', () => false) do?**
A: It tells Cypress to ignore JavaScript errors thrown by the website's own scripts. Without it, if the site's third-party analytics throws an error, Cypress would fail our test even though our test logic is correct.

---

## SECTION 7 — Key Terms Quick Reference

| Term | One-line definition |
|---|---|
| **E2E Testing** | Testing complete user workflows in a real browser |
| **Test Suite** | A group of related tests inside a describe() block |
| **Test Case** | A single it() block that tests one behaviour |
| **Assertion** | A statement that checks if something is true — fails the test if false |
| **Selector** | A CSS pattern used to find an element (e.g., #id, .class, tag) |
| **Hook** | Code that runs automatically at specific points (beforeEach, afterEach) |
| **Custom Command** | A reusable Cypress function you define with Cypress.Commands.add() |
| **Alias** | A named reference to an element saved with .as() |
| **Fixture** | Static data files used as test data (not used in this project) |
| **Spec file** | A .cy.js file containing one or more test suites |
| **baseUrl** | The root URL configured in cypress.config.js |
| **Timeout** | Maximum time Cypress waits before declaring a command failed |
| **Happy path** | The test that follows the ideal expected flow |
| **Negative test** | A test that verifies the system correctly handles bad input |
| **DRY principle** | Don't Repeat Yourself — reuse code instead of copying it |
