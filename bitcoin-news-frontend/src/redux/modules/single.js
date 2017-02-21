import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/* Actions */
const SINGLE_POST_LOAD = 'single/SINGLE_POST_LOAD';

/* action creators */
export const loadSinglePost = createAction(SINGLE_POST_LOAD);

/* initialState */
const initialState = Map({
    loaded: false,
    post: null
    // comments: []
});

/* reducers */
export default handleActions({
    [SINGLE_POST_LOAD]: (state, action) => {
        const { post } = action.payload;
        return state.merge({
            post: post,
            loaded: true
        });
    }
}, initialState);
