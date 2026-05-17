// Task 1 — Login Tests
// Website: https://www.saucedemo.com

describe('Login Tests', () => {
  beforeEach(() => {
    cy.visit('/', { timeout: 120000 })
  })

  it('Login Test 1: Valid credentials should redirect to products dashboard', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    cy.url({ timeout: 15000 }).should('include', '/inventory.html')
    cy.get('.title').should('be.visible').and('have.text', 'Products')
  })

  it('Login Test 2: Invalid password should show error message', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('wrong_password')
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Username and password do not match')
  })

  it('Login Test 3: Empty fields should show validation message', () => {
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Username is required')
  })
})
