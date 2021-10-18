import { Categories } from './../Music';
export const categoriesResolver = async () => {
  return await Categories.find();
};
