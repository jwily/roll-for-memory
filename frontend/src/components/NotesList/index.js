import React from 'react';
import { NavLink, useParams, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './NotesList.css';

const NotesList = ({ notesLoaded }) => {

    const notes = useSelector(state => state.notes);

    const { bookId } = useParams();

    let filtered = bookId ? notes.notesOrder.filter(id => {
        return notes[id].notebookId === parseInt(bookId, 10);
    }) : notes.notesOrder;

    // Make the NavLink in here its own component
    return (
        <div className='notes-list'>
            <h2>NOTES</h2>
            {notesLoaded && filtered.map((id, idx) => {
                return <NavLink key={idx} to={`/notebooks/${bookId}/notes/${id}`}>{notes[id].name || `Untitled`}</NavLink>
            })}
        </div>
    )
}

export default NotesList;
