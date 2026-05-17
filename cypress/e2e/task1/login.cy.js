// Task 1 — Login Tests
// Website: https://the-internet.herokuapp.com/login
// Valid credentials: tomsmith / SuperSecretPassword!

describe('Login Tests', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('Login Test 1: Valid credentials should redirect to secure area', () => {
    cy.get('#username').type('tomsmith')
    cy.get('#password').type('SuperSecretPassword!')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/secure')
    cy.get('h2').should('be.visible').and('have.text', 'Secure Area')
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
