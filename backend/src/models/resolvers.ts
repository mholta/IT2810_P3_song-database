import { Albums, Artists, Songs} from "./Music";

export const resolvers = {
    Query: {
        artists: async () =>  await Artists.find(),
        songs: async() => await Songs.find().populate({path:"album", populate: {path: "artists"}}).populate("artists"),
        albums: async() => await Albums.find().populate("artists"),
    },
    Mutation: {
        createArtist: async(_, args: {name: string}) => {
            const artist = new Artists({_id: "asdfk", name:args.name}); //TODO dummy mutation. Must be changeg
            await artist.save();
            return artist;

        }
    }
};