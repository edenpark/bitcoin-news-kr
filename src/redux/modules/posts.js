import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/* Actions */
const PAGE_NUM_SET = 'posts/PAGE_NUM_SET';
const POST_STORE_UPDATE = 'posts/POST_STORE_UPDATE';

const POST_UPVOTE_UPDATE = 'posts/POST_UPVOTE_UPDATE';

/* action creators */
export const setPageNum = createAction(PAGE_NUM_SET);
export const updatePostStore = createAction(POST_STORE_UPDATE);

export const updateUpvotePost = createAction(POST_UPVOTE_UPDATE);

/* initialState */
const initialState = Map({
    pageNum: 1,
    loading: true,
    posts: [],
    currentPage: 1,
    nextPage: true
});

/* reducers */
export default handleActions({
    [PAGE_NUM_SET]: (state, action) => {
        const value = action.payload;
        return state.set('pageNum', value);
    },
    [POST_STORE_UPDATE]: (state, action) => {
        const data = action.payload;
        console.log(data.posts);
        return state.merge({
            loading: false,
            posts: data.posts,
            nextPage: data.nextPage,
            currentPage: data.currentPage
        });
    },
    [POST_UPVOTE_UPDATE]: (state, action) => {
        const { postId, upvotes } = action.payload;
        const indexOfListingToUpdate = state.get('posts').findIndex(listing => {
          return listing.get('id') === postId;
        });
        return state.setIn(['posts', indexOfListingToUpdate, 'upvotes'], upvotes);
    }
}, initialState);
