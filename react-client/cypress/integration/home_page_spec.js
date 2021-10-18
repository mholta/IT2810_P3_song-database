describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/');
  });

  it('should search for song', () => {
    cy.get('input[name=query]').type(`${'All pris'}{enter}`);

    cy.url().should('include', '/search?query=All+pris');
    cy.get('h4').should('contain', 'All pris');
  });
});
