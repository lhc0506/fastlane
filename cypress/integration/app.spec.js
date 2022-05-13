describe('Navigation', () => {
  it('should navigate to the issues page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')
    cy.get('h1').contains('FastLane_FrontEnd Assignment')

    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="issues"]').click().then(() => { })

    // The new url should include "/about"
    cy.url().should('include', '/issues')

    // The new page should contain an h1 with "About page"
    cy.get('h1').contains('issues')
  })
})