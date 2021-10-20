import { FilterCategory } from './../../api/types';
import { SET_ALL_THEMES } from './filter.actionTypes';

export const setAllThemes = (themes: FilterCategory[]) => ({
  type: SET_ALL_THEMES,
  payload: {
    themes,
  },
});
