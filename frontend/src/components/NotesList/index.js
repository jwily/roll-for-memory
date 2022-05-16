import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createNote, getBookNotes } from '../../store/notes';
import NoteCard from '../NoteCard';
// import { useEffect } from 'react';

import './NotesList.css';

const NotesList = () => {

    const dispatch = useDispatch();
    // const history = useHistory();

    const [notesLoaded, setNotesLoaded] = useState(false);

    const books = useSelector(state => state.books.entities);
    const data = useSelector(state => state.notes);

    const { bookId } = useParams();
    const images = ['grid', 'uldah', 'limsa'];
    // const bookName = books[bookId].name;

    // useEffect(() => {
    //     setNotesLoaded(false);
    //     dispatch(getBookNotes(bookId)).then(() => setNotesLoaded(true));
    // }, [dispatch, bookId])

    const notesList = useMemo(() => {
        return data.ids.map((id, idx) => {
            const note = data.entities[id];
            if (note.notebookId === parseInt(bookId, 10)) {
                return <NoteCard key={id} note={note} idx={idx} />;
            } else {
                return null;
            }
        })
    }, [data.entities, data.ids, bookId])

    if (!(bookId in books)) return <Redirect to='/' />

    const clickHandler = async () => {
        // Careful here, grabbing from params
        const note = await dispatch(createNote(bookId));
        // history.push(`/notebooks/${bookId}/notes/${note.id}`);
    }

    // ${images[bookId % 3]}
    // Make the NavLink in here its own component
    return (
        <div className={`list-img ${images[bookId % 3]}`} >
            <button type='button' className='note-create-btn' onClick={clickHandler}><span>Create Note</span></button>
            <div className='notes-list'>
                {notesList}
            </div>
        </div >
    )
}

export default NotesList;
