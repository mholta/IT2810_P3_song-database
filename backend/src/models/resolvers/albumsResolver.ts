import { Albums } from '../Music';
import { ArtistAlbumInput, ArtistSearch } from './types';

export const albumsResolver = async (_, args: ArtistAlbumInput) => {
  const limit = args.limit || Math.min(args.limit || 50, 50);
  let search: ArtistSearch = {};
  if (args.id) {
    search = { ...search, _id: args.id };
  }
  if (args.name) {
    search = { ...search, _id: args.name };
  }
  return await Albums.find(search).limit(limit).populate('artists');
};
