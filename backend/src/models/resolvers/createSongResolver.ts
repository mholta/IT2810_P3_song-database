import { Albums, Songs } from '../Music';
import { makeSlug, MutationSongsInput } from './types';

export const createSongResolver = async (_, args: MutationSongsInput) => {
  const slug = makeSlug(args.title) + '-' + args.artists[0];
  args._id = slug;
  const albumSlug = makeSlug(args.album);
  if (args.album !== albumSlug) {
    const album = new Albums({
      _id: albumSlug,
      title: args.album,
      artists: args.artists,
      releaseDate: args.releaseDate,
    });
    args.album = albumSlug;
    await album.save();
  }
  const song = new Songs(args);
  const songToBePopulated = await song.save();

  return await songToBePopulated.populate([
    {
      path: 'album',
      populate: { path: 'artists' },
    },
    { path: 'artists' },
  ]);
};
