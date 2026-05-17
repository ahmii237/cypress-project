// This file is loaded automatically before every spec file.
import './commands'

// Block saucedemo's analytics calls so they never delay page load
beforeEach(() => {
  cy.intercept('POST', 'https://events.backtrace.io/**', { statusCode: 200, body: {} }).as('analytics')
})
