import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
// import TitleInput from './TitleInput';

const NoteDisplay = () => {
    const notes = useSelector(state => state.notes);

    const { bookId, noteId } = useParams('');

    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    const note = notes[noteId];

    useEffect(() => {
        if (note) setTitle(note.name);
    }, [note])

    useEffect(() => {
        if (note) setContent(note.content);
    }, [note])

    return (
        <div>
            <input
                value={title}
                id='note-title'
                onChange={(e) => setTitle(e.target.value)}
                type='text'
            />
            <textarea
                value={content}
                id='note-content'
                onChange={(e) => setContent(e.target.value)}
            />
        </div>
    )
}

export default NoteDisplay;
