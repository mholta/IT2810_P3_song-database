import { SET_MENU_OPEN } from './layout.actionTypes';

export const setMenuOpen = (menuOpen: boolean) => ({
  type: SET_MENU_OPEN,
  payload: {
    menuOpen: menuOpen,
  },
});
