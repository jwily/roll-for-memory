import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { useEffect } from 'react';

import './NotesList.css';

const NotesList = () => {
    // const history = useHistory();

    const notes = useSelector(state => state.notes);
    // const books = useSelector(state => state.books);

    const { bookId } = useParams();

    const notesArray = Object.values(notes).sort((noteA, noteB) => {
        return new Date(noteB.updatedAt) - new Date(noteA.updatedAt);
    })

    const filtered = notesArray.filter((note) => {
        return note.notebookId === parseInt(bookId, 10);
    })

    const order = filtered.map(note => note.id)

    // Make the NavLink in here its own component
    return (
        <div className='notes-list'>
            <h2>Notes List</h2>
            {order.map((id, idx) => {
                return <NavLink key={idx} to={`/notebooks/${bookId}/notes/${id}`}>{notes[id].name || `Untitled`}</NavLink>
            })}
        </div>
    )
}

export default NotesList;
