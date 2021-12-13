const LOAD = 'message/LOAD';

export const loadMsg = (content, style) => ({
    type: LOAD,
    content,
    style
})

const initialState = { content: '', style: '' }

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            return {
                content: action.content,
                style: action.style
            }
        default:
            return state;
    }
}

export default messageReducer;
