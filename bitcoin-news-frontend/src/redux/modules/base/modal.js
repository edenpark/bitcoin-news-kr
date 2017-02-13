import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/* Actions */
const MODAL_OPEN = "base/modal/MODAL_OPEN";
const MODAL_CLOSE = "base/modal/MODAL_CLOSE";

/* action creators */
export const openModal = createAction(MODAL_OPEN);
export const closeModal = createAction(MODAL_CLOSE);

// export const closeModal = createAction(MODAL_CLOSE);
// Above code is same as below:
// const cloaseModal = (payload) => ({
//     type: MODAL_CLOSE,
//     payload
// })

/* initialState */
const initialState = Map({
    login: Map({
        open: false
    }),
    linkAccount: Map({
        open: false
    })
});

/* Creates multiple reducers */
export default handleActions({
    [MODAL_OPEN]: (state, action) => {
        /* Open modalName and set data by spread
            {
                ...modalName,
                data
            }
        */
        const { modalName, data } = action.payload;

        return state.mergeIn([modalName], {
            open: true,
            ...data
        })

        //Above same as below:
        // return {
        //     ...state,
        //     [modalName]: {
        //         ...state.login,
        //         open: true
        //     }
        // }
    },
    [MODAL_CLOSE]: (state, action) => {
        // Get modal name and hide
        const modalName = action.payload;
        return state.setIn([modalName, 'open'], false);
    }

}, initialState);
