import { csrfFetch } from "./csrf";

const LOAD = 'notes/LOAD';
const ADD_ONE = 'notes/ADD_ONE';
const REMOVE = 'notes/REMOVE'

const load = list => ({
    type: LOAD,
    list
})

const addOne = note => ({
    type: ADD_ONE,
    note
})

const remove = noteId => ({
    type: REMOVE,
    noteId
})

export const getNotes = () => async (dispatch) => {
    const response = await csrfFetch(`/api/notes`);

    if (response.ok) {
        const list = await response.json();
        dispatch(load(list));
    }
}

export const createNote = (bookId) => async (dispatch) => {

    const response = await csrfFetch(`/api/notes`, {
        method: 'POST',
        body: JSON.stringify({ bookId })
    })

    if (response.ok) {
        const note = await response.json();
        dispatch(addOne(note));
        return note;
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

export const removeNote = (noteId) => async (dispatch) => {

    const response = await csrfFetch(`/api/notes/${noteId}`, {
        method: 'DELETE',
        body: JSON.stringify({ noteId })
    });

    if (response.ok) {
        dispatch(remove(noteId))
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
        case REMOVE:
            const newState = { ...state };
            delete newState[action.noteId];
            return newState;
        default:
            return state;
    }
}

export default notesReducer;
