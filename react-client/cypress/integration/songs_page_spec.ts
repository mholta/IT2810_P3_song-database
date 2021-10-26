import { aliasQuery, hasOperationName } from '../utils/graphql-test-utils';

describe('The Songs Page', () => {
  beforeEach(() => {
    cy.intercept('POST', '/graphql', (req) => {
      aliasQuery(req, 'Songs');
      aliasQuery(req, 'GetSong');
      aliasQuery(req, 'GetThemes');
    });
  });

  it('successfully loads', () => {
    cy.visit('/search');
    cy.wait('@gqlSongsQuery')
      .its('response.body.data.songs')
      .should((songs) => {
        expect(songs.pages).to.be.equal(7);
        expect(songs.songs.length).to.be.equal(20);
      });
  });

  it('should search for single song', () => {
    cy.visit('/search');
    cy.wait('@gqlSongsQuery');

    cy.get('input[name=query]').type(`${'all pris'}{enter}`);

    cy.wait('@gqlSongsQuery')
      .its('response.body.data.songs')
      .should((songs) => {
        expect(songs.pages).to.be.equal(1);
        expect(songs.songs.length).to.be.equal(1);
        expect(songs.songs[0]._id).to.be.equal('all-pris-acta-lovsang');
      });

    cy.url().should('include', '/search?query=all+pris');
    cy.contains('All pris');
  });

  it('should filter by category', () => {
    cy.visit('/search');
    cy.wait('@gqlSongsQuery');

    cy.contains('Takk og lovprisning').click();

    cy.url().should('include', '/search?theme=takk-og-lovprisning');

    cy.wait('@gqlSongsQuery')
      .its('response.body.data.songs')
      .should((songs) => {
        expect(songs.pages).to.be.equal(2);
        expect(songs.songs.length).to.be.equal(20);
        expect(songs.songs[0]._id).to.be.equal(
          'i-en-skare-som-ingen-kan-telle-david-andre-ostby'
        );
      });
  });

  it('should sort by alphabet', () => {
    cy.visit('/search');
    cy.wait('@gqlSongsQuery');

    cy.get('#sort-select').click();
    cy.contains('Sorter på Tittel A-Å').click();

    cy.url().should('include', '/search?sort=title&order=asc');

    cy.wait('@gqlSongsQuery')
      .its('response.body.data.songs')
      .should((songs) => {
        expect(songs.pages).to.be.equal(7);
        expect(songs.songs.length).to.be.equal(20);
        expect(songs.songs[0]._id).to.be.equal('all-pris-acta-lovsang');
        expect(songs.songs[1]._id).to.be.equal('alltid-god-david-andre-ostby');
      });

    cy.get('#sort-select').click();
    cy.contains('Sorter på Tittel Å-A').click();

    cy.url().should('include', '/search?sort=title&order=desc');
    cy.wait('@gqlSongsQuery')
      .its('response.body.data.songs')
      .should((songs) => {
        expect(songs.pages).to.be.equal(7);
        expect(songs.songs.length).to.be.equal(20);
      });
  });
});
