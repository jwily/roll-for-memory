import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HomeNotesList = ({ notesLoaded }) => {

    const notes = useSelector(state => state.notes);

    const order = Object.values(notes).sort((noteA, noteB) => {
        return new Date(noteB.updatedAt) - new Date(noteA.updatedAt);
    }).map((note) => note.id);

    // Make the NavLink in here its own component
    return (
        <div className='notes-list'>
            <h2>ALL NOTES</h2>
            {notesLoaded && order.map((id, idx) => {
                const note = notes[id];
                return <NavLink key={idx} to={`/notebooks/${note.notebookId}/notes/${id}`}>{note.name || `Untitled`}</NavLink>
            })}
        </div>
    )
}

export default HomeNotesList;
