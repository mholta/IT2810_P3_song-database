import { Albums, Artists, Songs } from './Music';

export const resolvers = {
  Query: {
    artists: async () => await Artists.find(),
    songs: async (_, args: SongsInput) => {
      console.log('hei');
      const limit = args.limit || Math.min(args.limit || 50, 50);
      const filter: Filter = args.filter || { categories: [] };

      let initialSorting: Sorting = {
        sortType: SortType.RELEASE_DATE,
        order: SortOrder.DESC,
      };
      let search: any = {};
      let setScore: any = 1;
      if (args.searchString) {
        search = { $text: { $search: args.searchString } };
        setScore = { $meta: 'textScore' };
        initialSorting.order = SortOrder.BEST;
        initialSorting.sortType = SortType.SCORE;
      }
      const sorting: Sorting = args.sorting || initialSorting;
      const sort = { [sorting.sortType]: SortOrderToDB(sorting.order) };
      let categoryFilter = {};
      if (filter.categories.length > 0) {
        categoryFilter = { categories: { $in: filter.categories } };
      }
      const page = args.page - 1 || 0;
      console.log(search, setScore);
      const songs = await Songs.aggregate([
        // search in songs
        { $match: search },
        { $set: { score: setScore } },
        // union with artists and search in them too
        {
          $unionWith: {
            coll: 'artists',
            pipeline: [
              { $match: search },
              { $set: { score: setScore } },
              {
                $lookup: {
                  from: 'songs',
                  localField: '_id',
                  foreignField: 'artists',
                  as: 'singsIn',
                },
              },
              { $unwind: '$singsIn' },
              {
                $replaceRoot: {
                  newRoot: { $mergeObjects: ['$singsIn', { score: '$score' }] },
                },
              },
            ],
          },
        },
        // union with albums and search in them too
        {
          $unionWith: {
            coll: 'albums',
            pipeline: [
              { $match: search },
              { $set: { score: setScore } },
              {
                $lookup: {
                  from: 'songs',
                  localField: '_id',
                  foreignField: 'album',
                  as: 'singsIn',
                },
              },
              { $unwind: '$singsIn' },
              {
                $replaceRoot: {
                  newRoot: { $mergeObjects: ['$singsIn', { score: '$score' }] },
                },
              },
            ],
          },
        },
        // filter on category if categories inputed
        {
          $match: categoryFilter,
        },
        // "poplate" artists in song
        {
          $lookup: {
            from: 'artists',
            localField: 'artists',
            foreignField: '_id',
            as: 'artists',
          },
        },
        // "populate" album in song
        {
          $lookup: {
            from: 'albums',
            localField: 'album',
            foreignField: '_id',
            pipeline: [
              {
                // "poplate" artists in album
                $lookup: {
                  from: 'artists',
                  localField: 'artists',
                  foreignField: '_id',

                  as: 'artists',
                },
              },
            ],
            as: 'album',
          },
        },
        // unwind album as a song does not have multiple albums
        { $unwind: '$album' },

        // to keep all data but remove duplicates
        {
          $group: {
            _id: '$_id',
            song: { $first: '$$ROOT' },
            // to score results with sum of scores in artist-name, album-title and song-title
            score: { $sum: '$score' },
          },
        },
        { $replaceRoot: { newRoot: '$song' } },
        { $sort: sort },
        { $skip: limit * page },
        { $limit: limit },
      ]);
      return songs;
    },
    albums: async () => await Albums.find().populate('artists'),
    song: async (_, args: { id: String }) =>
      await Songs.findById(args.id)
        .populate({ path: 'album', populate: { path: 'artists' } })
        .populate('artists'),
  },
  Mutation: {
    createArtist: async (_, args: { name: string }) => {
      const artist = new Artists({ _id: 'asdfk', name: args.name }); //TODO dummy mutation. Must be changeg
      await artist.save();
      return artist;
    },
  },
};
interface SongsInput {
  limit?: number;
  searchString?: string;
  filter?: {
    categories: string[];
  };
  sorting?: {
    sortType: SortType;
    order: SortOrder;
  };
  page?: number;
}

interface Filter {
  categories: string[];
}
enum SortType {
  RELEASE_DATE = 'releaseDate',
  TITLE = 'title',
  ARTIST = 'artist',
  ALBUM = 'album',
  SCORE = 'score',
}
enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
  BEST = 'best',
}
const SortOrderToDB = (order: SortOrder) => {
  switch (order) {
    case SortOrder.ASC:
      return 1;
    case SortOrder.DESC:
      return -1;
    case SortOrder.BEST:
      return { $meta: 'textScore' };
    default:
      return 1;
  }
};
interface Sorting {
  sortType: SortType;
  order: SortOrder;
}
