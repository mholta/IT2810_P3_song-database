import { combineReducers } from 'redux';
import { LayoutState, layoutReducer } from './layout/layout.reducer';

export interface RootState {
  layout: LayoutState;
}

export default combineReducers({
  layout: layoutReducer,
});
