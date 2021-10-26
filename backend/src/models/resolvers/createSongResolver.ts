import { Albums, Artists, Songs } from '../Music';
import { makeSlug, MutationSongsInput } from './types';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import isImage from 'is-image';

export const createSongResolver = async (_, args: MutationSongsInput) => {
  const albumSlug = makeSlug(args.album);
  let stream, pathNameBig, pathNameSmall, smallImg, biggerImg;
  if (args.file) {
    const { createReadStream, filename } = await args.file;
    if (!isImage(filename)) {
      throw Error('File is not an image');
    }
    const { ext } = path.parse(filename);
    const fileEndpointName =
      makeSlug(args.album) +
      '-' +
      makeSlug(args.artists[0]) +
      '-' +
      args.releaseDate.substring(0, 4);
    stream = createReadStream();
    pathNameSmall = `/var/www/html/project3/public/images/${
      fileEndpointName + '-small' + ext
    }`;
    pathNameBig = `/var/www/html/project3/public/images/${
      fileEndpointName + ext
    }`;
    smallImg = sharp().resize({ width: 200, height: 200, fit: 'cover' });
    biggerImg = sharp().resize({ width: 600, height: 600, fit: 'cover' });

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
    } else {
      await Albums.findById(args.album);
    }
  } else {
    try {
      await Albums.findById(args.album);
    } catch {
      throw Error('A new album must have an image');
    }
  }
  // to throw error if artist doesnt exist
  args.artists.forEach(async (artist) => {
    await Artists.findById(artist);
  });
  const slug = makeSlug(args.title) + '-' + args.artists[0];
  args._id = slug;

  const song = new Songs(args);
  const songToBePopulated = await song.save();
  // await stream.pipe(smallImg).pipe(fs.createWriteStream(pathNameSmall));
  await stream.pipe(biggerImg).pipe(fs.createWriteStream(pathNameBig));
  return await songToBePopulated.populate([
    {
      path: 'album',
      populate: { path: 'artists' },
    },
    { path: 'artists' },
  ]);
};
