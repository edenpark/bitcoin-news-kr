import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import postsHelper from 'helpers/firebase/database/posts';

const postsData = postsHelper.getDefaultData();

/* Actions */
const PAGE_NUM_SET = 'posts/PAGE_NUM_SET';
const POST_STORE_UPDATE = 'posts/POST_STORE_UPDATE';

/* action creators */
export const setPageNum = createAction(PAGE_NUM_SET);
export const updatePostStore = createAction(POST_STORE_UPDATE);

/* initialState */
const initialState = Map({
    pageNum: 1,
    loading: true,
    posts: postsData.posts,
    nextPage: postsData.nextPage,
    currentPage: postsData.currentPage
});

/* reducers */
export default handleActions({
    [PAGE_NUM_SET]: (state, action) => {
        const value = action.payload;
        return state.set('pageNum', value);
    },
    [POST_STORE_UPDATE]: (state, action) => {
        const data = action.payload;
        return state.merge({
            loading: false,
            posts: data.posts,
            nextPage: data.nextPage,
            currentPage: data.currentPage
        });
    }
}, initialState);
