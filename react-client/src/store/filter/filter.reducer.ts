import { dummyCategories } from './../../api/dummyContent';
import { FilterCategory } from './../../api/types';
import { SET_ALL_CATEGORIES } from './filter.actionTypes';
export interface FilterState {
  allCategories: FilterCategory[];
}

const initialFilterState: FilterState = {
  allCategories: dummyCategories,
};

export const filterReducer = (
  state: FilterState = initialFilterState,
  action: any
): FilterState => {
  switch (action.type) {
    case SET_ALL_CATEGORIES:
      return {
        ...state,
        allCategories: action.payload.categories,
      };

    default:
      return state;
  }
};
