import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/* Actions */
const EXAMPLE = 'base/header/EXAMPLE';

/* action creators */
export const example = createAction(EXAMPLE);


/* initialState */
const initialState = Map({
    something: true
});

/* Creates multiple reducers */
export default handleActions({
    [EXAMPLE]: (state, action) => (
        state.set('something', action.payload)
    )
}, initialState);
