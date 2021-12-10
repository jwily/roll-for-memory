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

const initialState = {};

const notebooksReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allBooks = {};
            action.list.forEach(book => {
                allBooks[book.id] = book;
            })
            return {
                ...allBooks,
                ...state
            }
        case ADD_ONE:
            if (!state[action.book.id]) {
                const newState = {
                    ...state,
                    [action.book.id]: {
                        ...action.book
                    }
                }
                return newState;
            }
            return {
                ...state,
                [action.book.id]: {
                    ...action.book
                }
            }
        case REMOVE:
            const newState = { ...state };
            delete newState[action.bookId];
            return newState;
        default:
            return state;
    }
}

export default notebooksReducer;
