import { csrfFetch } from "./csrf";

const LOAD = 'notebooks/LOAD';

const load = list => ({
    type: LOAD,
    list
})

export const getNotebooks = () => async (dispatch) => {
    const response = await csrfFetch(`/api/notebooks`);

    if (response.ok) {
        const list = await response.json();
        dispatch(load(list));
    }
}

const sortByName = (list) => {
    return list.sort((bookA, bookB) => {
        if (bookA.name < bookB.name) return -1;
        if (bookA.name > bookB.name) return 1;
        return 0;
    }).map((book) => book.id);
}

const initialState = { booksOrder: [] };

const notebooksReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allBooks = {};
            action.list.forEach(book => {
                allBooks[book.id] = book;
            })
            return {
                ...allBooks,
                ...state,
                booksOrder: sortByName(action.list)
            }
        default:
            return state;
    }
}

export default notebooksReducer;
