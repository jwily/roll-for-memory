import React from 'react';
import { NavLink, useParams, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createNote } from '../../store/notes';
// import { useEffect } from 'react';

import './NotesList.css';

const NotesList = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const notes = useSelector(state => state.notes);
    const books = useSelector(state => state.books);

    const { bookId } = useParams();
    const images = ['grid', 'uldah', 'limsa'];
    // const bookName = books[bookId].name;

    if (!(bookId in books)) return <Redirect to='/' />

    const notesArray = Object.values(notes).sort((noteA, noteB) => {
        return new Date(noteB.updatedAt) - new Date(noteA.updatedAt);
    })

    const filtered = notesArray.filter((note) => {
        return note.notebookId === parseInt(bookId, 10);
    })

    const order = filtered.map(note => note.id)

    const clickHandler = async () => {
        // Careful here, grabbing from params
        const note = await dispatch(createNote(bookId));
        history.push(`/notebooks/${bookId}/notes/${note.id}`);
    }

    // ${images[bookId % 3]}
    // Make the NavLink in here its own component
    return (
        <div className={`list-img ${images[bookId % 3]}`} >
            <button type='button' className='note-create-btn' onClick={clickHandler}><span>Create Note</span></button>
            <div className='notes-list'>
                {order.map((id, idx) => {
                    return <NavLink key={idx} to={`/notebooks/${bookId}/notes/${id}`}>{notes[id].name || `Untitled`}</NavLink>
                })}
            </div>
        </div >
    )
}

export default NotesList;
