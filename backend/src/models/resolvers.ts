import { albumsResolver } from './resolvers/albumsResolver';
import { artistResolver } from './resolvers/artistResolver';
import { createSongResolver } from './resolvers/createSongResolver';
import { songResolver } from './resolvers/songResolver';
import { songsResolver } from './resolvers/songsResolver';

export const resolvers = {
  Query: {
    artists: artistResolver,
    songs: songsResolver,
    albums: albumsResolver,
    song: songResolver,
  },
  Mutation: {
    createSong: createSongResolver,
  },
};
