export const makeSlug = (title: string): string => {
  return title
    .split(new RegExp('\\s+'))
    .join('-')
    .toLowerCase()
    .replace(/å/g, 'a')
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'o');
};

export interface MutationSongsInput {
  _id?: string;
  title: string;
  artists: string;
  album: string;
  contributors?: string[];
  iTunes?: string;
  key?: string;
  producers?: string[];
  releaseDate: string;
  spotify?: string;
  tempo?: string;
  time?: string;
  writers?: string[];
}
export interface ArtistAlbumInput {
  id?: string;
  name?: string;
  limit?: number;
}

export type ArtistSearch = { _id?: string; name?: string };

export interface SongsSearch {
  $text?: { $search: string };
}
export interface SongsSearchArtist {
  name?: string;
}
export interface SongsSearchSongs {
  $or?: [{ writers: string }, { producers: string }];
}

export interface SongsInput {
  limit?: number;
  searchString?: string;
  filter?: {
    categories: string[];
    contributor?: string;
  };
  sorting?: {
    sortType: SortType;
    order: SortOrder;
  };
  page?: number;
}

export enum SortType {
  RELEASE_DATE = 'releaseDate',
  TITLE = 'title',
  ARTIST = 'artist',
  ALBUM = 'album',
  SCORE = 'score',
}
export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
  BEST = 'best',
}
export const SortOrderToDB = (order: SortOrder) => {
  switch (order) {
    case SortOrder.ASC:
      return 1;
    case SortOrder.DESC:
      return -1;
    case SortOrder.BEST:
      return { $meta: 'textScore' };
    default:
      return 1;
  }
};
export interface Sorting {
  sortType: SortType;
  order: SortOrder;
}
