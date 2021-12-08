import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
// import TitleInput from './TitleInput';

import './NoteDisplay.css';

const NoteDisplay = () => {
    const history = useHistory();

    const notes = useSelector(state => state.notes);

    const { noteId } = useParams('');
    const note = notes[noteId];

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // useEffect(() => {
    //     if (notes && !notes[noteId]) history.push('/')
    // }, [notes, noteId, history])

    useEffect(() => {
        if (note) {
            if (note.name) setTitle(note.name);
            else setTitle('Untitled');
        }
    }, [note])

    useEffect(() => {
        if (note) {
            if (note.content) setContent(note.content);
            else setContent('Let your thoughts flow...');
        }
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
