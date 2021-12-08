import React from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import './NotesList.css';

const NotesList = () => {
    const history = useHistory();

    const notes = useSelector(state => state.notes);
    const books = useSelector(state => state.books);

    const { bookId } = useParams();

    // useEffect(() => {
    //     if (books && !books[bookId]) history.push('/')
    // }, [bookId, books, history])

    // if (!notes) return null;

    let filtered = bookId ? notes.notesOrder.filter(id => {
        return notes[id].notebookId === parseInt(bookId, 10);
    }) : notes.notesOrder;

    // Make the NavLink in here its own component
    return (
        <div className='notes-list'>
            <h2>Notes List</h2>
            {filtered.map((id, idx) => {
                return <NavLink key={idx} to={`/notebooks/${bookId}/notes/${id}`}>{notes[id].name || `Untitled`}</NavLink>
            })}
        </div>
    )
}

export default NotesList;
