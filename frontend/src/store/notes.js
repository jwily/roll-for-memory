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

export const getBookNotes = (bookId) => async (dispatch) => {
    const response = await csrfFetch(`/api/notebooks/${bookId}/notes`);

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

const sortByUpdate = (obj, arr) => {
    arr.sort((a, b) => {
        return new Date(obj[b].updatedAt) - new Date(obj[a].updatedAt)
    })
}

const initialState = { entities: {}, ids: [] };

const notesReducer = (state = initialState, action) => {
    const newState = { entities: { ...state.entities }, ids: [...state.ids] };
    switch (action.type) {
        case LOAD:
            const newList = { entities: {}, ids: [] }
            action.list.forEach(note => {
                newList.entities[note.id] = note;
            })
            newList.ids = Object.keys(newList.entities);
            sortByUpdate(newList.entities, newList.ids);
            return newList;
        case ADD_ONE:
            newState.entities[action.note.id] = action.note;
            newState.ids = Object.keys(newState.entities);
            sortByUpdate(newState.entities, newState.ids);
            return newState;
        case REMOVE:
            delete newState.entities[action.noteId];
            newState.ids = Object.keys(newState.entities);
            sortByUpdate(newState.entities, newState.ids);
            return newState;
        case REMOVE_BOOK:
            for (let id in newState.entities) {
                console.log(newState.entities[id]);
                if (newState.entities[id].notebookId === parseInt(action.bookId, 10)) {
                    delete newState.entities[id];
                }
            }
            newState.ids = Object.keys(newState.entities);
            sortByUpdate(newState.entities, newState.ids);
            return newState;
        default:
            return state;
    }
}

export default notesReducer;
