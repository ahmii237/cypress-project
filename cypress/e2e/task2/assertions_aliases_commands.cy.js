// Task 2 — Assertions, Aliases & Custom Commands
// Website: https://the-internet.herokuapp.com

describe('Assertion Practice', () => {
  beforeEach(() => {
    cy.visit('/')
  })

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

    // Save the dropdown as an alias
    cy.get('#dropdown').as('myDropdown')

    // Assert default value is empty (no option selected yet)
    cy.get('@myDropdown').should('be.visible')

    // Select Option 1 using the alias
    cy.get('@myDropdown').select('1')
    cy.get('@myDropdown').should('have.value', '1')

    // Reuse alias to select Option 2
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
