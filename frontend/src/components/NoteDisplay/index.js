import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
// import TitleInput from './TitleInput';

const NoteDisplay = () => {
    const { bookId, noteId } = useParams();

    const [title, setTitle] = useState('');

    const notes = useSelector(state => state.notes);
    const note = notes[noteId];

    return (
        <div>
            <input />
        </div>
    )
}

export default NoteDisplay;
