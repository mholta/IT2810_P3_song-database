import { Songs } from '../Music';

export const songResolver = async (_, args: { id: String }) => {
  await Songs.findById(args.id)
    .populate({ path: 'album', populate: { path: 'artists' } })
    .populate('artists');
};
