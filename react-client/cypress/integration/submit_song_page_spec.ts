import { aliasMutation } from '../utils/graphql-test-utils';

describe('The Submit Song Page', () => {
  beforeEach(() => {
    cy.intercept('POST', '/graphql', (req) => {
      aliasMutation(req, 'CreateSong');
    });
  });

  it('successfully loads', () => {
    cy.visit('/submit-song');
  });

  it('should submit a song', () => {
    cy.visit('/submit-song');

    cy.get('#artist-search').type('lov');
    cy.contains('Acta Lovsang').click();

    cy.get('#album-search').type('mø');
    cy.contains('Møtepunkt').click();

    cy.get('#song-title').type('All pris e2e test');

    cy.get('#themes').click();
    cy.contains('Nåde og kross').click();
    cy.get('#themes').click();
    cy.contains('Takk og lovprisning').click();
    cy.get('#themes').type('nye');
    cy.contains('Fornyelse').click();
    cy.get('#themes').click();
    cy.contains('Proklamasjon').click();
    cy.get('#themes').type('{backspace}');
    cy.get('#themes').click();
    cy.contains('Overgivelse').click();

    cy.get('#key').type('F#');
    cy.get('#tempo').type('68');
    cy.get('#time').type('4/4');

    cy.get('#writers').type(
      'Eline Walderhaug, Thomas Wilhelmsen \n Tore Kulleseid'
    );
    cy.get('#producers').type('Tore Kulleseid');
    cy.get('#contributors').type(
      'Tobias Valdal Høssung (trommer), Ruben Strømme (bass), Anders Kjøllesdal Hansen (keys), Vemund Aasemoen Aardal (keys){enter}Samuel Hilleren (keys), Aleksander Øvergaard (gitar), Mads Even Vold (gitar), Mathilde Eriksen (vokal), Eline Walderhaug (kor), Vemund Aasemoen Aardal (kor)'
    );
    cy.get('#song-spotify-link').type(
      'https://open.spotify.com/track/7kXJtTxucwufmP2f32yeJo'
    );
    cy.get('#song-apple-music-link').type(
      'https://music.apple.com/no/album/møtepunkt-single/1520693028'
    );

    cy.get('button[type="submit"]').click();

    cy.wait('@gqlCreateSongMutation')
      .its('response.body.data.createSong')
      .should((song) => {
        expect(song._id).to.be.equal('all-pris-e2e-test-acta-lovsang');
        expect(song.title).to.be.equal('All pris e2e test');
      });

    cy.url().should('include', '/submit-song');
  });
});
