import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HomeNotesList = () => {

    const notes = useSelector(state => state.notes);

    const order = Object.values(notes).sort((noteA, noteB) => {
        return new Date(noteB.updatedAt) - new Date(noteA.updatedAt);
    }).map((note) => note.id);

    // Make the NavLink in here its own component
    return (
        <div className='list-img home-img'>
            <div className='home-banner'>
                <span>Search</span>
            </div>
            <div className='notes-list'>
                {order.map((id, idx) => {
                    const note = notes[id];
                    return <NavLink key={idx} to={`/notebooks/${note.notebookId}/notes/${id}`}>{note.name || `Untitled`}</NavLink>
                })}
            </div>
        </div>
    )
}

export default HomeNotesList;
