import { dummyCategories } from './../../api/dummyContent';
import { FilterCategory } from './../../api/types';
import { SET_ALL_THEMES } from './filter.actionTypes';
export interface FilterState {
  allThemes: FilterCategory[];
}

const initialFilterState: FilterState = {
  allThemes: [],
};

export const filterReducer = (
  state: FilterState = initialFilterState,
  action: any
): FilterState => {
  switch (action.type) {
    case SET_ALL_THEMES:
      return {
        ...state,
        allThemes: action.payload.themes,
      };

    default:
      return state;
  }
};
