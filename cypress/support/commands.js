// Custom Commands

/**
 * cy.login(username, password)
 * Uses cy.session() to log in once and cache the session.
 * Subsequent calls restore the cached session instead of reloading the page,
 * which avoids repeated slow page loads on every test.
 */
Cypress.Commands.add('login', (username, password) => {
  cy.session(
    [username, password],
    () => {
      cy.visit('/', { timeout: 120000 })
      cy.get('[data-test="username"]', { timeout: 15000 }).type(username)
      cy.get('[data-test="password"]').type(password)
      cy.get('[data-test="login-button"]').click()
      cy.url({ timeout: 15000 }).should('include', '/inventory.html')
    },
    {
      validate() {
        cy.visit('/inventory.html', { timeout: 120000 })
        cy.url().should('include', '/inventory.html')
      },
    }
  )
  cy.visit('/inventory.html', { timeout: 120000 })
})

/**
 * cy.logout()
 * Opens burger menu and clicks Logout.
 */
Cypress.Commands.add('logout', () => {
  cy.get('#react-burger-menu-btn').click()
  cy.get('#logout_sidebar_link').should('be.visible').click()
  cy.url().should('eq', Cypress.config('baseUrl') + '/')
})

/**
 * cy.addToCart(productSlug)
 * Adds a product by its data-test id slug.
 * Usage: cy.addToCart('sauce-labs-backpack')
 */
Cypress.Commands.add('addToCart', (productSlug) => {
  cy.get(`[data-test="add-to-cart-${productSlug}"]`).click()
})
