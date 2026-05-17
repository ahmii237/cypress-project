// Task 2 — Custom Commands
// Reusable commands defined here are available in all spec files

/**
 * Custom login command — fills username & password then clicks submit.
 * Usage: cy.login('standard_user', 'secret_sauce')
 */
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/')
  cy.get('[data-test="username"]').type(username)
  cy.get('[data-test="password"]').type(password)
  cy.get('[data-test="login-button"]').click()
})

/**
 * Custom logout command — opens burger menu and clicks Logout.
 * Usage: cy.logout()
 */
Cypress.Commands.add('logout', () => {
  cy.get('#react-burger-menu-btn').click()
  cy.get('#logout_sidebar_link').should('be.visible').click()
  cy.url().should('eq', Cypress.config('baseUrl') + '/')
})

/**
 * Custom addToCart command — adds a product by its data-test id slug.
 * Usage: cy.addToCart('sauce-labs-backpack')
 */
Cypress.Commands.add('addToCart', (productSlug) => {
  cy.get(`[data-test="add-to-cart-${productSlug}"]`).click()
})
