import { Artists } from '../Music';
import { ArtistsInput, ArtistsSearch } from './types';

export const artistResolver = async (_, args: ArtistsInput) => {
  const limit = args.limit || Math.min(args.limit || 50, 50);
  let search: ArtistsSearch = {};
  if (args.id) {
    search = { ...search, _id: args.id };
  }
  if (args.name) {
    search = {
      ...search,
      name: RegExp(args.name, 'i'),
    };
  }
  console.log(search);
  return await Artists.find(search).limit(limit);
};