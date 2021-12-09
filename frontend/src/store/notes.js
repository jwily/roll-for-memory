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
    console.log(payload);

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

const sortByUpdated = (list) => {
    return list.sort((noteA, noteB) => {
        return new Date(noteB.updatedAt) - new Date(noteA.updatedAt);
    }).map((note) => note.id);
}

const sortOnEdit = (obj, list) => {
    return list.sort((idA, idB) => {
        return new Date(obj[idB].updatedAt) - new Date(obj[idA].updatedAt);
    });
}

const initialState = { notesOrder: [] };

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
                notesOrder: sortByUpdated(action.list)
            };
        case ADD_ONE:
            if (!state[action.note.id]) {
                const newState = {
                    ...state,
                    [action.note.id]: {
                        ...action.note
                    }
                }
                const newOrder = [...newState.notesOrder];
                newOrder.push(action.note.id);
                newState.notesOrder = sortOnEdit(newState, newOrder);
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
