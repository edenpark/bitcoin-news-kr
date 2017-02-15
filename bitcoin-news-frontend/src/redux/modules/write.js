import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/* Actions */
const WRITE_SHOW= 'write/WRITE_SHOW';
const WRITE_HIDE = 'write/WRITE_HIDE';

const WRITE_RICH_EDITOR = 'write/WRITE_RICH_EDITOR';
const WRITE_URL_EDITOR = 'write/WRITE_URL_EDITOR';

const RICH_TITLE_SET = 'write/RICH_TITLE_SET';
const RICH_CONTENT_SET= 'write/RICH_CONTENT_SET';
const RICH_VALIDATION_SET = 'write/RICH_VALIDATION_SET';

const URL_LINK_SET = 'write/URL_LINK_SET';
const URL_METADATA_SET = 'write/URL_METADATA_SET';
const URL_VALIDATION_SET = 'write/URL_VALIDATION_SET';

/* action creators */
export const showWrite = createAction(WRITE_SHOW);
export const hideWrite = createAction(WRITE_HIDE);

export const richEditor = createAction(WRITE_RICH_EDITOR);
export const urlEditor = createAction(WRITE_URL_EDITOR)

export const setRichTitle = createAction(RICH_TITLE_SET);
export const setRichContent = createAction(RICH_CONTENT_SET);
export const setRichValidity = createAction(RICH_VALIDATION_SET);

export const setUrlLink = createAction(URL_LINK_SET);
export const setUrlMetadata = createAction(URL_METADATA_SET);
export const setUrlValidity = createAction(URL_VALIDATION_SET);

/* initialState */
const initialState = Map({
    main: Map({
        visible: false,
        editor: 'rich'
    }),
    richEditor: Map({
        title: '어떤 제목으로 하시겠어요?',
        content: '<br><p>정보 공유 감사합니다.<p><br>',
        validity: Map({
            valid: false,
            message: null,
        }),
    }),
    urlEditor: Map({
        link: '페이지 주소를 넣어주세요',
        validity: Map({
            fetching: false,
            valid: false,
            message: null,
            fetched: false,
        }),
        metadata: Map({
            title: '',
            description: '',
            image: '',
            source: ''
        }),
    })
});

/* reducers */
export default handleActions({
    [WRITE_SHOW]: (state, action) => {
        return state.setIn(['main', 'visible'], true)
    },
    [WRITE_HIDE]: (state, action) => {
        return state.setIn(['main', 'visible'], false)
    },
    [WRITE_RICH_EDITOR]: (state, action) => {
        return state.setIn(['main', 'editor'], 'rich')
    },
    [WRITE_URL_EDITOR]: (state, action) => {
        return state.setIn(['main', 'editor'], 'url')
    },
    [RICH_TITLE_SET]: (state, action) => {
        const value = action.payload;
        return state.setIn(['richEditor', 'title'], value)
    },
    [RICH_CONTENT_SET]: (state, action) => {
        const value = action.payload;
        return state.setIn(['richEditor', 'content'], value)
    },
    [RICH_VALIDATION_SET]: (state, action) => {
        const { valid, message } = action.payload;
        return state.mergeIn(['richEditor', 'validity'], {
            valid,
            message
        })
    },
    [URL_LINK_SET]: (state, action) => {
        const value = action.payload;
        return state.setIn(['urlEditor', 'link'], value)
    },
    [URL_METADATA_SET]: (state, action) => {
        const { title, description, image, source } = action.payload;

        return state.mergeIn(['urlEditor', 'metadata'], {
            title,
            description: (!description) ? title : description,
            image,
            source
        })
    },
    [URL_VALIDATION_SET]: (state, action) => {
        const { fetching, valid, message, fetched } = action.payload
        return state.mergeIn(['urlEditor', 'validity'], {
            fetching,
            valid,
            message,
            fetched,
        })
    }
}, initialState);
