// Task 1 — Form Test
// Website: https://www.saucedemo.com
// Tests the checkout form after adding a product to cart

describe('Form Test', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.url().should('include', '/inventory.html')
  })

  it('Form Test 1: Fill checkout form and assert order confirmation', () => {
    // Add first product to cart
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

    // Go to cart
    cy.get('.shopping_cart_link').click()
    cy.url().should('include', '/cart.html')

    // Proceed to checkout
    cy.get('[data-test="checkout"]').click()
    cy.url().should('include', '/checkout-step-one.html')

    // Fill the checkout form
    cy.get('[data-test="firstName"]').type('Ali')
    cy.get('[data-test="lastName"]').type('Hassan')
    cy.get('[data-test="postalCode"]').type('54000')

    cy.get('[data-test="continue"]').click()
    cy.url().should('include', '/checkout-step-two.html')

    // Finish the order
    cy.get('[data-test="finish"]').click()

    // Assert order confirmation message
    cy.get('.complete-header')
      .should('be.visible')
      .and('have.text', 'Thank you for your order!')

    cy.get('.complete-text').should('be.visible')
    cy.screenshot('order-confirmation')
  })
})
