import {
  SET_TITLE,
  SET_ARTISTS,
  SET_RELEASE_DATE,
  SET_MAIN_ARTIST,
} from './album.actionTypes';

export const setTitle = (title: string) => ({
  type: SET_TITLE,
  payload: { title },
});

export const setMainArtist = (artistId: string) => ({
  type: SET_MAIN_ARTIST,
  payload: { artistId },
});

/**
 * @param artists list of id of artists
 */
export const setArtists = (artists: string[]) => ({
  type: SET_ARTISTS,
  payload: { artists },
});

export const setReleaseDate = (releaseDate: Date) => ({
  type: SET_RELEASE_DATE,
  payload: { releaseDate },
});
