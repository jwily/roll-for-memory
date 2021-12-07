import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getNotes } from '../../store/notes';

import './NotesList.css';

const NotesList = () => {
    const dispatch = useDispatch();

    const notes = useSelector(state => state.notes);

    useEffect(() => {
        dispatch(getNotes())
    }, [dispatch])

    return (
        <div className='notes-list'>
            <h2>Notes List</h2>
            {notes.notesOrder.map((id, idx) => {
                return <NavLink key={idx} to={`/notes/${id}`}>{notes[id].name || `Untitled`}</NavLink>
            })}
        </div>
    )
}

export default NotesList;
