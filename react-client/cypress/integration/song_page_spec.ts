import { aliasQuery } from '../utils/graphql-test-utils';

describe('The Song Page', () => {
  beforeEach(() => {
    cy.intercept('POST', '/graphql', (req) => {
      aliasQuery(req, 'GetSong');
      aliasQuery(req, 'GetThemes');
    });
  });

  it('successfully loads', () => {
    cy.visit('/song/all-pris-acta-lovsang');
  });

  it('should query for the song', () => {
    cy.visit('/song/all-pris-acta-lovsang');

    cy.wait('@gqlGetSongQuery')
      .its('response.body.data.song')
      .should((song) => {
        expect(song._id).to.be.equal('all-pris-acta-lovsang');
        expect(song.title).to.be.equal('All pris');
        expect(song.artists[0].name).to.be.equal('Acta Lovsang');
      });

    cy.wait('@gqlGetThemesQuery')
      .its('response.body.data.categories')
      .should((categories) => {
        expect(categories.length).to.be.equal(11);
        expect(categories[0].title).to.be.equal('Overgivelse');
        expect(categories[0]._id).to.be.equal('overgivelse');
      });

    cy.contains('All pris');

    cy.contains('Nåde og kross').click();

    cy.contains('Fullbrakt').click();

    cy.wait('@gqlGetSongQuery')
      .its('response.body.data.song')
      .should((song) => {
        expect(song._id).to.be.equal('fullbrakt-david-andre-ostby');
        expect(song.title).to.be.equal('Fullbrakt');
        expect(song.artists[0].name).to.be.equal('David André Østby');
      });
  });
});
