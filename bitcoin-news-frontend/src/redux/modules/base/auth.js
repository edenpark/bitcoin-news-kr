import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/* Actions */
const AUTHENTICATE = 'auth/AUTHENTICATE';
const PROFILE_SYNC = 'auth/PROFILE_SYNC';

const LOGOUT = 'auth/LOGOUT';

/* action creators */
export const authenticate = createAction(AUTHENTICATE);
export const syncProfile = createAction(PROFILE_SYNC);

export const logout = createAction(LOGOUT);

/* initialState */
const initialState = Map({
    user: null,
    profile: Map({
        username: null,
        displayName: null,
        thumbnail: null
    }),
    profileSynced: false,
});

/* reducers */
export default handleActions({
    [AUTHENTICATE]: (state, action) => {
        //Store user initialForm
        const user = action.payload;
        return state.set('user', user);
    },
    [PROFILE_SYNC]: (state, action) => {
        const profile = action.payload;

        if(profile === null) {
            return state.merge({
                profile: initialState.get('profile'),
                profileSynced: true
            })
        }

        return state.merge({
            profile,
            profileSynced: true
        });
    },
    [LOGOUT]: (state, action) => {
        return state.merge({
            user: null,
            profile: Map({
                username: null,
                displayName: null,
                thumbnail: null
            }),
            profileSynced: false
        });
    }
}, initialState);
