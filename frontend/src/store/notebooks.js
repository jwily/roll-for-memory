import { csrfFetch } from "./csrf";

const LOAD = 'notebooks/LOAD';
const ADD_ONE = 'notebooks/ADD_ONE';
const REMOVE = 'notebooks/REMOVE'

const load = list => ({
    type: LOAD,
    list
})

const addOne = book => ({
    type: ADD_ONE,
    book
})

const remove = bookId => ({
    type: REMOVE,
    bookId
})

export const getNotebooks = () => async (dispatch) => {
    const response = await csrfFetch(`/api/notebooks`);

    if (response.ok) {
        const list = await response.json();
        dispatch(load(list));
    }
}

export const createBook = (name) => async (dispatch) => {
    const response = await csrfFetch(`/api/notebooks`, {
        method: 'POST',
        body: JSON.stringify({ name })
    })

    if (response.ok) {
        const bundle = await response.json();
        if (bundle.errors) return bundle;
        dispatch(addOne(bundle));
        return bundle;
    }
}

export const editBook = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/notebooks/${payload.bookId}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const bundle = await response.json();
        if (bundle.errors) return bundle;
        dispatch(addOne(bundle));
        return bundle;
    }
}

export const removeBook = (bookId) => async (dispatch) => {

    const response = await csrfFetch(`/api/notebooks/${bookId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(remove(bookId))
    }
}

// const sortByName = (list) => {
//     return list.sort((bookA, bookB) => {
//         if (bookA.name < bookB.name) return -1;
//         if (bookA.name > bookB.name) return 1;
//         return 0;
//     }).map((book) => book.id);
// }

const sortByName = (obj, arr) => {
    return arr.sort((idA, idB) => {
        if (obj[idA].name < obj[idB].name) return -1;
        if (obj[idA].name > obj[idB].name) return 1;
        return 0;
    })
};

const notesByUpdate = (arr) => {
    arr.sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt)
    })
}

const initialState = { entities: {}, ids: [] };

const notebooksReducer = (state = initialState, action) => {
    const newState = { entities: { ...state.entities }, ids: [...state.ids] };
    switch (action.type) {
        case LOAD:
            action.list.forEach(book => {
                newState.entities[book.id] = book;
            })
            newState.ids = Object.keys(newState.entities);
            sortByName(newState.entities, newState.ids);
            for (let id in newState.entities) {
                const book = newState.entities[id];
                // const bookNotes = book.Notes;
                // console.log(book);
                notesByUpdate(book.Notes);
                // delete book.Notes;
                book.noteIds = book.Notes.map(note => {
                    return note.id
                })
            }
            return newState;
        case ADD_ONE:
            newState.entities[action.book.id] = action.book;
            newState.ids = Object.keys(newState.entities);
            sortByName(newState.entities, newState.ids);
            return newState;
        case REMOVE:
            delete newState.entities[action.bookId];
            newState.ids = Object.keys(newState.entities);
            sortByName(newState.entities, newState.ids);
            return newState;
        default:
            return state;
    }
}

export default notebooksReducer;
