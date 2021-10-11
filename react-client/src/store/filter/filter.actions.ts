import store from '../store';
import { FilterCategory } from './../../api/types';
import { SET_ALL_CATEGORIES } from './filter.actionTypes';

export const setAllCategories = (categories: FilterCategory[]) => ({
  type: SET_ALL_CATEGORIES,
  payload: {
    categories,
  },
});
