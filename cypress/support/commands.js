// Custom Commands
// Website: https://the-internet.herokuapp.com

/**
 * cy.login(username, password)
 * Visits the login page, fills in credentials, and submits the form.
 * Usage: cy.login('tomsmith', 'SuperSecretPassword!')
 */
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login')
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.get('button[type="submit"]').click()
})

/**
 * cy.logout()
 * Clicks the logout link from the secure area.
 * Usage: cy.logout()
 */
Cypress.Commands.add('logout', () => {
  cy.get('a[href="/logout"]').click()
  cy.url().should('include', '/login')
})
