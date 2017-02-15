import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/* Actions */
const USER_MENU_OPEN = 'base/header/USER_MENU_OPEN';
const USER_MENU_CLOSE = 'base/header/USER_MENU_CLOSE';

const HEADER_SHOW = 'base/header/HEADER_SHOW';
const HEADER_HIDE = 'base/header/HEADER_HIDE';

/* action creators */
export const openUserMenu = createAction(USER_MENU_OPEN);
export const closeUserMenu = createAction(USER_MENU_CLOSE);

export const showHeader = createAction(HEADER_SHOW);
export const hideHeader = createAction(HEADER_HIDE);

/* initialState */
const initialState = Map({
    userMenu: Map({
        open: false
    }),
    visible: true
});

/* Creates multiple reducers */
export default handleActions({
    [USER_MENU_OPEN]: (state, action) => (
        state.setIn(['userMenu', 'open'], true)
    ),
    [USER_MENU_CLOSE]: (state, action) => (
        state.setIn(['userMenu', 'open'], false)
    ),
    [HEADER_SHOW]: (state, action) => (
        state.set('visible', true)
    ),
    [HEADER_HIDE]: (state, action) => (
        state.set('visible', false)
    )
}, initialState);
