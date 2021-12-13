const LOAD = 'message/LOAD'

export const msg = (message, style, vis) => ({
    type: LOAD,
    message,
    style,
    vis
})

const initialState = { message: '', style: '', vis: false }

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            return {
                message: action.message,
                style: action.style,
                vis: action.vis
            }
        default:
            return state;
    }
}

export default messageReducer;
