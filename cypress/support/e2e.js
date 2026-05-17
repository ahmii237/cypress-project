import './commands'

// Prevent uncaught exceptions from the site's own scripts failing our tests
Cypress.on('uncaught:exception', () => false)
