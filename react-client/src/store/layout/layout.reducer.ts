import { SET_MENU_OPEN } from './layout.actionTypes';
export interface LayoutState {
  menuOpen: boolean;
}

const initialLayoutState: LayoutState = {
  menuOpen: false,
};

export const layoutReducer = (
  state: LayoutState = initialLayoutState,
  action: any
) => {
  switch (action.type) {
    case SET_MENU_OPEN:
      return {
        ...state,
        menuOpen: action.payload.menuOpen,
      };
    default:
      return state;
  }
};
