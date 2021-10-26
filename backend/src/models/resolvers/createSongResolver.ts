import { Albums, Songs } from '../Music';
import { makeSlug, MutationSongsInput } from './types';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

export const createSongResolver = async (_, args: MutationSongsInput) => {
  let fileEndpointName: String;
  if (args.file) {
    const { createReadStream, filename } = await args.file;
    const { ext } = path.parse(filename);
    fileEndpointName =
      makeSlug(args.album) +
      '-' +
      makeSlug(args.artists[0]) +
      '-' +
      args.releaseDate.substring(0, 4);
    const stream = createReadStream();
    const pathNameSmall = `/var/www/html/project3/public/images/${
      fileEndpointName + '-small' + ext
    }`;
    const pathNameBig = `/var/www/html/project3/public/images/${
      fileEndpointName + ext
    }`;
    const smallImg = sharp()
      .resize({ width: 200, height: 200, fit: 'cover' })
      .jpeg({ quality: 70 });
    const biggerImg = sharp()
      .resize({ width: 600, height: 600, fit: 'cover' })
      .jpeg({ quality: 80 });
    await stream.pipe(smallImg).pipe(fs.createWriteStream(pathNameSmall));
    await stream.pipe(biggerImg).pipe(fs.createWriteStream(pathNameBig));

    const albumSlug = makeSlug(args.album);
    if (args.album !== albumSlug) {
      const album = new Albums({
        _id: albumSlug,
        title: args.album,
        artists: args.artists,
        releaseDate: args.releaseDate,
        picture:
          'http://it2810-21.idi.ntnu.no/project3/public/images/' +
          fileEndpointName +
          ext,
      });
      args.album = albumSlug;
      await album.save();
    }
  }
  const slug = makeSlug(args.title) + '-' + args.artists[0];
  args._id = slug;

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
