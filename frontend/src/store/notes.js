import { csrfFetch } from "./csrf";

const LOAD = 'notes/LOAD';
const ADD_ONE = 'notes/ADD_ONE';

const load = list => ({
    type: LOAD,
    list
})

const addOne = note => ({
    type: ADD_ONE,
    note
})

export const getNotes = () => async (dispatch) => {
    const response = await csrfFetch(`/api/notes`);

    if (response.ok) {
        const list = await response.json();
        dispatch(load(list));
    }
}

export const editNote = (payload) => async (dispatch) => {

    const response = await csrfFetch(`/api/notes/${payload.noteId}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const note = await response.json();
        dispatch(addOne(note));
        return note;
    }
}

const initialState = {};

const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allNotes = {};
            action.list.forEach(note => {
                allNotes[note.id] = note;
            })
            return {
                ...allNotes,
                ...state,
            };
        case ADD_ONE:
            if (!state[action.note.id]) {
                const newState = {
                    ...state,
                    [action.note.id]: {
                        ...action.note
                    }
                }
                return newState;
            }
            return {
                ...state,
                [action.note.id]: {
                    ...action.note
                }
            };
        default:
            return state;
    }
}

export default notesReducer;
