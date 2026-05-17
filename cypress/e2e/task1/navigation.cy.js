// Task 1 — Navigation Tests
// Website: https://the-internet.herokuapp.com

describe('Navigation Tests', () => {
  it('Navigation Test 1: Clicking Checkboxes link should open the checkboxes page', () => {
    cy.visit('/')
    cy.contains('a', 'Checkboxes').click()

    cy.url().should('include', '/checkboxes')
    cy.get('h3').should('be.visible').and('have.text', 'Checkboxes')
    cy.screenshot('navigation-test1-checkboxes')
  })

  it('Navigation Test 2: Visit Dropdown page then Inputs page and assert headings', () => {
    // First page — Dropdown
    cy.visit('/dropdown')
    cy.get('h3').should('be.visible').and('have.text', 'Dropdown List')
    cy.screenshot('navigation-test2-dropdown')

    // Second page — Inputs
    cy.visit('/inputs')
    cy.get('h3').should('be.visible').and('have.text', 'Inputs')
    cy.screenshot('navigation-test2-inputs')
  })
})
