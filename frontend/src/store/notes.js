import { csrfFetch } from "./csrf";

const LOAD = 'notes/LOAD';
const ADD_ONE = 'notes/ADD_ONE';
const REMOVE = 'notes/REMOVE';
const REMOVE_BOOK = 'notes/REMOVE_BOOK';

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

export const removeBookNotes = bookId => ({
    type: REMOVE_BOOK,
    bookId
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
        const bundle = await response.json();
        if (bundle.errors) return bundle;
        dispatch(addOne(bundle));
        return bundle;
    }
}

export const removeNote = (noteId) => async (dispatch) => {

    const response = await csrfFetch(`/api/notes/${noteId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(remove(noteId));
    }
}

// export const removeBookNotes = (bookId) => async (dispatch) => {

//     const response = await csrfFetch(`/api/notebooks/${bookId}`, {
//         method: 'DELETE',
//     })

//     if (response.ok) {
//         dispatch(removeBook(bookId));
//     }
// }

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
            const removeOne = { ...state };
            delete removeOne[action.noteId];
            return removeOne;
        case REMOVE_BOOK:
            const removeMany = { ...state };
            for (let id in removeMany) {
                if (removeMany[id].notebookId === parseInt(action.bookId, 10)) {
                    delete removeMany[id];
                }
            }
            return removeMany;
        default:
            return state;
    }
}

export default notesReducer;
