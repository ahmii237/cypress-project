import './commands'

// Prevent uncaught exceptions from saucedemo's own scripts from failing tests
Cypress.on('uncaught:exception', () => false)

// Before every test, block ALL third-party analytics/tracking requests
// so they never block the page load event
beforeEach(() => {
  cy.intercept('POST', 'https://events.backtrace.io/**', { statusCode: 200, body: {} })
  cy.intercept('GET',  'https://events.backtrace.io/**', { statusCode: 200, body: {} })
  cy.intercept('**/*.hot-update.*', { statusCode: 200, body: '' })
})
