const LOAD = 'notes/LOAD';

const load = list => ({
    type: LOAD,
    list
})

export const getNotes = () => async (dispatch) => {
    const response = await fetch(`/api/notes`);

    if (response.ok) {
        const list = await response.json();
        dispatch(load(list));
    }
}

const sortByUpdated = (list) => {
    return list.sort((noteA, noteB) => {
        return noteB.updatedAt - noteA.updateAt;
    }).map((note) => note.id);
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
            }
        default:
            return state;
    }
}

export default notesReducer;
