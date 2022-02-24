import React, { useState, useEffect, useMemo } from 'react';
import NoteCard from '../NoteCard';
import { useSelector, useDispatch } from 'react-redux';

import { getNotes } from '../../store/notes';

const HomeNotesList = () => {

    const dispatch = useDispatch();

    const [notesLoaded, setNotesLoaded] = useState(false);

    useEffect(() => {
        dispatch(getNotes()).then(() => setNotesLoaded(true));
    }, [dispatch])

    const data = useSelector(state => state.notes);

    const notesList = useMemo(() => {
        return data.ids.map((id, idx) => {
            const note = data.entities[id];
            return <NoteCard key={id} note={note} idx={idx} />;
        })
    }, [data.entities, data.ids])

    // Make the NavLink in here its own component
    return (
        <div className='list-img home-img'>
            <div className='home-banner'>
                <span>All Notes</span>
            </div>
            <div className='notes-list'>
                {notesLoaded && notesList}
            </div>
        </div>
    )
}

export default HomeNotesList;
