import { gql } from "apollo-server-core";

export const typeDefs = gql`
    type Query {
        artists: [Artist!]
        songs: [Song!]
        albums: [Album!]
    }
    type Mutation {
        createArtist(name:String!): Artist!
    }

    type Artist {
        _id: String
        
        name: String
        location: String
        affilation: String
        webpage: String
        instagram: String
        iTunes: String
        youtube: String
        spotify: String
        picture: String
    }

    type Song {
        _id: String
        album: Album
        artists: [Artist]
        contributors: [String]
        iTunes: String
        key: String
        producers: [String]
        releaseDate: String
        spotify: String
        tempo: String
        time: String
        title: String
        writers: [String]
    }  

    type Album {
        _id: String
        title: String
        artists: [Artist]
        iTunes: String
        picture: String
        producers: [String]
        publisher: String
        releaseDate: String
        spotify: String
    }
`