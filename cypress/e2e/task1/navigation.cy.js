// Task 1 — Navigation Tests
// Website: https://www.saucedemo.com

describe('Navigation Tests', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.url().should('include', '/inventory.html')
  })

  it('Navigation Test 1: Clicking cart icon should open the cart page', () => {
    cy.get('.shopping_cart_link').click()

    cy.url().should('include', '/cart.html')
    cy.get('.title').should('be.visible').and('have.text', 'Your Cart')
  })

  it('Navigation Test 2: Visit Products page then About page via burger menu', () => {
    // Assert we are on the Products page
    cy.url().should('include', '/inventory.html')
    cy.get('.title').should('have.text', 'Products')

    // Open burger menu and go to About
    cy.get('#react-burger-menu-btn').click()
    cy.get('#about_sidebar_link')
      .should('be.visible')
      .and('have.attr', 'href', 'https://saucelabs.com/')
  })
})
