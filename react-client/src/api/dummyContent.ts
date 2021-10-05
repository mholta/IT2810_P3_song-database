import { Album, Artist, Song } from './types';
export const dummyArtist: Artist = {
  id: 'acta',
  name: 'Acta',
  location: 'Stavanger',
  webPage: 'actabibelskole.no',
  picture:
    'https://uploads-ssl.webflow.com/5ed95215f8138049de460b43/605cf392565470abf2a035d4_acta_lovsang_2020.jpg',
};

export const dummyAlbum: Album = {
  id: 'motepunkt-acta-lovsang',
  title: 'Møtepunkt',
  artists: [dummyArtist],
  picture:
    'https://uploads-ssl.webflow.com/5ed95215f8138049de460b43/604374cdc48ec430aa6d4894_M%C3%B8tepunkt%20-%20cover.jpeg',
  releaseDate: new Date(
    'Fri Jul 10 2020 00:00:00 GMT+0000 (Coordinated Universal Time)'
  ),
  publisher: 'IMI-kirken',
  producers: ['Tore Kulleseid'],
  iTunes: 'https://music.apple.com/no/album/møtepunkt-single/1520693028',
  spotify: 'https://open.spotify.com/album/6WzBmm9l5zp1HnfKRVCAKx',
};

export const dummySong: Song = {
  id: 'all-pris-acta-lovsang',
  title: 'All pris',
  album: dummyAlbum,
  tempo: '68',
  key: 'F#',
  time: '4/4',
  artists: [dummyArtist],
  writers: ['Eline Walderhaug', 'Thomas Wilhelmsen', 'Tore Kulleseid'],
  contributors: [
    'Tobias Valdal Høssung (trommer)',
    'Ruben Strømme (bass)',
    'Anders Kjøllesdal Hansen (keys)',
    'Vemund Aasemoen Aardal (keys)',
    'Samuel Hilleren (keys)',
    'Aleksander Øvergaard (gitar)',
    'Mads Even Vold (gitar)',
    'Mathilde Eriksen (vokal)',
    'Eline Walderhaug (kor)',
    'Vemund Aasemoen Aardal (kor)',
  ],
  producers: ['Tore Kulleseid'],
  releaseDate: new Date(
    'Fri Jul 10 2020 00:00:00 GMT+0000 (Coordinated Universal Time)'
  ),
  iTunes: 'https://music.apple.com/no/album/møtepunkt-single/1520693028',
  spotify: 'https://open.spotify.com/track/7kXJtTxucwufmP2f32yeJo',
};
