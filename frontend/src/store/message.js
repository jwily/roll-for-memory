const LOAD = 'message/LOAD'

export const msg = (content, style, vis) => ({
    type: LOAD,
    content,
    style,
    vis
})

const initialState = { content: 'Test', style: '', vis: false }

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            return {
                content: action.content,
                style: action.style,
                vis: action.vis
            }
        default:
            return state;
    }
}

export default messageReducer;
