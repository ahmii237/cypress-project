// Task 1 — Form Test
// Website: https://the-internet.herokuapp.com/login
// Tests the login form as a full form submission flow

describe('Form Test', () => {
  it('Form Test 1: Fill login form and assert successful secure area entry', () => {
    cy.visit('/login')

    // Fill out the form
    cy.get('#username').type('tomsmith')
    cy.get('#password').type('SuperSecretPassword!')

    cy.screenshot('form-test1-before-submit')

    // Submit the form
    cy.get('button[type="submit"]').click()

    // Assert success — flash message and secure area heading visible
    cy.get('#flash')
      .should('be.visible')
      .and('contain.text', 'You logged into a secure area!')

    cy.get('h2').should('be.visible').and('contain.text', 'Secure Area')
    cy.screenshot('form-test1-after-submit')
  })
})
