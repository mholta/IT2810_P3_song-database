describe('The Song Page', () => {
  it('successfully loads', () => {
    cy.visit('/song/all-pris-acta-lovsang');
  });

  it('should query for the song', () => {
    cy.fixture('song').as('testSong');

    cy.intercept('POST', '/graphql/all-pris-acta-lovsang', (req) => {
      req.reply((res) => {
        res.body = this.testSong;
      });
    });

    cy.visit('/song/all-pris-acta-lovsang');

    cy.wait('@gqlGetSongQuery')
      .its('response.body')
      .should((song) => {
        expect(song._id).to.be.equal('all-pris-acta-lovsang');
        expect(song.title).to.be.equal('All pris');
        expect(song.album).to.be.equal('motepunkt-acta-lovsang');
      });
  });
});
