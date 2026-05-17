// Task 2 — Assertions, Aliases & Custom Commands
// Website: https://www.saucedemo.com

describe('Assertion Practice', () => {
  beforeEach(() => {
    cy.login('standard_user', 'secret_sauce')
    cy.url().should('include', '/inventory.html')
  })

  it('Assertion 1: Page title should be visible', () => {
    cy.get('.title').should('be.visible')
  })

  it('Assertion 2: App logo should have exact text "Swag Labs"', () => {
    cy.get('.app_logo').should('have.text', 'Swag Labs')
  })

  it('Assertion 3: Twitter icon link should have correct href attribute', () => {
    cy.get('[data-test="social-twitter"]')
      .should('have.attr', 'href', 'https://twitter.com/saucelabs')
  })

  it('Negative Assertion: Error message should not exist on successful login', () => {
    cy.get('[data-test="error"]').should('not.exist')
  })
})

describe('Alias Practice', () => {
  beforeEach(() => {
    cy.login('standard_user', 'secret_sauce')
  })

  it('Save cart badge as alias and assert it updates after adding a product', () => {
    // Save the cart icon container as an alias
    cy.get('.shopping_cart_link').as('cartIcon')

    // Cart badge should not be visible yet (no items)
    cy.get('@cartIcon').find('.shopping_cart_badge').should('not.exist')

    // Add a product
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

    // Reuse the alias — badge should now show 1
    cy.get('@cartIcon')
      .find('.shopping_cart_badge')
      .should('be.visible')
      .and('have.text', '1')
  })
})

describe('Custom Command — login()', () => {
  it('Custom login command should log in and land on the products page', () => {
    cy.login('standard_user', 'secret_sauce')
    cy.url().should('include', '/inventory.html')
    cy.get('.title').should('have.text', 'Products')
  })

  it('Custom logout command should return to the login page', () => {
    cy.login('standard_user', 'secret_sauce')
    cy.logout()
    cy.get('[data-test="login-button"]').should('be.visible')
  })
})

describe('Bonus — Extra Practice', () => {
  beforeEach(() => {
    cy.login('standard_user', 'secret_sauce')
  })

  it('Product image should be visible on the inventory page', () => {
    cy.get('.inventory_item_img').first().should('be.visible')
  })

  it('Sort dropdown selects "Price (low to high)" and first item price updates', () => {
    cy.get('[data-test="product_sort_container"]').as('sortDropdown')
    cy.get('@sortDropdown').select('lohi')
    cy.get('@sortDropdown').should('have.value', 'lohi')

    cy.get('.inventory_item_price').first().should('have.text', '$7.99')
  })

  it('cy.contains() finds Add to Cart button by text', () => {
    cy.contains('Add to cart').first().should('be.visible').click()
    cy.get('.shopping_cart_badge').should('have.text', '1')
  })

  it('Screenshot captured during inventory page visit', () => {
    cy.get('.inventory_list').should('be.visible')
    cy.screenshot('inventory-page')
  })
})
