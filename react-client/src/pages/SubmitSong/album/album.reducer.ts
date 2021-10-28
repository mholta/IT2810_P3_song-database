import {
  SET_TITLE,
  SET_ARTISTS,
  SET_MAIN_ARTIST,
  SET_RELEASE_DATE,
} from './album.actionTypes';

export interface AlbumState {
  title: string;
  releaseDate: Date | null;
  mainArtistId: string; // id of main artist
  artists: string[]; // list of artist ids
}

export const initialAlbumState: AlbumState = {
  title: '',
  releaseDate: null,
  mainArtistId: '',
  artists: [],
};

export const albumReducer = (
  state: AlbumState = initialAlbumState,
  action: any
): AlbumState => {
  switch (action.type) {
    case SET_TITLE:
      return {
        ...state,
        title: action.payload.title,
      };

    case SET_MAIN_ARTIST:
      return {
        ...state,
        mainArtistId: action.payload.artistId,
        artists: action.payload.artistId ? [action.payload.artistId] : [],
      };

    case SET_ARTISTS:
      return {
        ...state,
        artists: action.payload.artists,
      };

    case SET_RELEASE_DATE:
      return {
        ...state,
        releaseDate: action.payload.releaseDate,
      };

    default:
      return state;
  }
};
