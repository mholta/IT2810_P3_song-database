import { combineReducers } from 'redux';
import { filterReducer, FilterState } from './filter/filter.reducer';
import { LayoutState, layoutReducer } from './layout/layout.reducer';

export interface RootState {
  layout: LayoutState;
  filter: FilterState;
}

export default combineReducers({
  layout: layoutReducer,
  filter: filterReducer,
});
