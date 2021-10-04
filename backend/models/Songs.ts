import {Schema} from 'mongoose';

const ArtistSchema = new Schema({
    id: String,
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
    id: String,
    title: String,
    artists: [ArtistSchema],
    iTunes: String,
    picture: String,
    producers: [String],
    publisher: String,
    releaseDate: Date,
    spotify: String,
});

const SongSchema = new Schema({
    id: String,
    album: AlbumSchema,
    artists: [ArtistSchema],
    contributors: [String],
    iTunes: String,
    key: String,
    producers: [String],
    releaseDate: Date,
    spotify: String,
    tempo: String,
    time: String,
    title: String,
    writers: [String]
})
