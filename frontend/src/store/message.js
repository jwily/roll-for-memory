const LOAD = 'message/LOAD'

export const msg = (content, style, vis) => ({
    type: LOAD,
    content,
    style,
    vis
})

const initialState = { content: '', style: 'normal', vis: 'no' }

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const newState = { ...state };
            if (action.content) newState.content = action.content;
            if (action.style) newState.style = action.style;
            if (action.vis) newState.vis = action.vis;
            return newState;
        default:
            return state;
    }
}

export default messageReducer;
