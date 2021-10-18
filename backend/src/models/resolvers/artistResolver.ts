import { Artists } from '../Music';
import { ArtistAlbumInput, ArtistSearch } from './types';

export const artistResolver = async (_, args: ArtistAlbumInput) => {
  const limit = args.limit || Math.min(args.limit || 50, 50);
  let search: ArtistSearch = {};
  if (args.id) {
    search = { ...search, _id: args.id };
  }
  if (args.name) {
    search = { ...search, _id: args.name };
  }
  return await Artists.find(search).limit(limit);
};
