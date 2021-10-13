export interface Artist {
  _id: string;
  name: string;
  location: string;
  picture: string;

  affiliation?: Artist; // maybe array?
  webPage?: string;
  instagram?: string;
  iTunes?: string;
  youtube?: string;
  spotify?: string;
}

export interface Album {
  _id: string;
  title: string;
  releaseDate: Date;
  artists: Artist[];
  picture: string;

  producers?: string[];
  publisher?: string;
  iTunes?: string;
  spotify?: string;
}

export interface Song {
  _id: string;
  title: string;
  album: Album;
  key: string;
  releaseDate: Date;
  artists: Artist[];

  tempo?: string;
  time?: string;
  writers?: string[];
  contributors?: string[];
  producers?: string[];
  iTunes?: string;
  spotify?: string;
  categories?: FilterCategory[];
}

export interface FilterCategory {
  id: string;
  title: string;
}
