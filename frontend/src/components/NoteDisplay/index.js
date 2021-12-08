import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
// import TitleInput from './TitleInput';

import './NoteDisplay.css';

const NoteDisplay = ({ notes }) => {
    // const notes = useSelector(state => state.notes);

    const { noteId } = useParams('');
    const note = notes[noteId];

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (note) setTitle(note.name);
    }, [note])

    useEffect(() => {
        if (note) setContent(note.content);
    }, [note])

    return (
        <div className='note-display'>
            <input
                value={title}
                className='note-title'
                onChange={(e) => setTitle(e.target.value)}
                type='text'
            />
            <textarea
                value={content}
                className='note-content'
                onChange={(e) => setContent(e.target.value)}
            />
        </div>
    )
}

export default NoteDisplay;
