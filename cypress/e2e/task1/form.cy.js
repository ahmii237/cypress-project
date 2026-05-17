// Task 1 — Form Test
// Website: https://www.saucedemo.com

describe('Form Test', () => {
  beforeEach(() => {
    cy.login('standard_user', 'secret_sauce')
  })

  it('Form Test 1: Fill checkout form and assert order confirmation', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

    cy.get('.shopping_cart_link').click()
    cy.url().should('include', '/cart.html')

    cy.get('[data-test="checkout"]').click()
    cy.url().should('include', '/checkout-step-one.html')

    cy.get('[data-test="firstName"]').type('Ali')
    cy.get('[data-test="lastName"]').type('Hassan')
    cy.get('[data-test="postalCode"]').type('54000')

    cy.get('[data-test="continue"]').click()
    cy.url().should('include', '/checkout-step-two.html')

    cy.get('[data-test="finish"]').click()

    cy.get('.complete-header')
      .should('be.visible')
      .and('have.text', 'Thank you for your order!')

    cy.get('.complete-text').should('be.visible')
    cy.screenshot('order-confirmation')
  })
})
