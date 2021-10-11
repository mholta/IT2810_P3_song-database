import {Document, model, Model, Schema} from 'mongoose';

const ArtistSchema = new Schema({
    _id: String,
    name: String,
    location: String,
    affilation: String,
    webpage: String,
    instagram: String,
    iTunes: String,
    youtube: String,
    spotify: String,
    picture: String,
});

const AlbumSchema = new Schema({
    _id: String,
    title: String,
    artists: [{type: String, ref: "Artists"}],
    iTunes: String,
    picture: String,
    producers: [String],
    publisher: String,
    releaseDate: String,
    spotify: String,
});

const SongSchema = new Schema({
    _id: String,
    album: {type: String, ref: "Albums"},
    artists: [{type: String, ref: "Artists"}],
    contributors: [String],
    iTunes: String,
    key: String,
    producers: [String],
    releaseDate: String,
    spotify: String,
    tempo: String,
    time: String,
    title: String,
    writers: [String]
})

export interface Album extends Document {
    _id: string;
    title: string;
    artists: String[];
    iTunes: string;
    picture: string;
    producers: string[];
    publisher: string;
    releaseDate: String;
    spotify: string;
};

export interface Artist extends Document {
    _id: string;
    name: string;
    location: string;
    affilation: string;
    webpage: string;
    instagram: string;
    iTunes: string;
    youtube: string;
    spotify: string;
    picture: string;
}

export interface Song extends Document {
    _id: string;
    slug: string;
    album: string;
    artists: string[];
    contributors: string[];
    iTunes: string;
    key: string;
    producers: string[];
    releaseDate: String;
    spotify: string;
    tempo: string;
    time: string;
    title: string;
    writers: string[];
}


export const Songs: Model<Song> = model<Song>('Songs', SongSchema);
export const Artists: Model<Artist> = model<Artist>('Artists', ArtistSchema);
export const Albums: Model<Album> = model<Album>('Albums', AlbumSchema);