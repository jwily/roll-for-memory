import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editNote } from '../../store/notes';

import './NoteDisplay.css';

const NoteDisplay = () => {
    const dispatch = useDispatch();

    const notes = useSelector(state => state.notes);

    // Will this be a problem for bad urls?
    const { noteId } = useParams('');
    const note = notes[noteId];

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [saving, setSaving] = useState(false);

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

    const titleSave = () => {
        const payload = { noteId: note.id, name: title };
        dispatch(editNote(payload))
    }

    const contentSave = (e) => {
        const payload = { noteId: note.id, content: e.target.value };
        dispatch(editNote(payload))
    }

    const delay = (ms) => {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, ms);
        })
    };

    const autoSave = (e) => {
        setSaving(true);
        console.log('Saving...')
        if (!saving) {
            delay(2500).then(() => {
                setSaving(false)
                contentSave(e)
                console.log('Saved!')
            })
        }
    }

    // const contentChange = (e) => {
    //     setContent(e.target.value);
    // }

    const handleContentChange = (e) => {
        setContent(e.target.value);
        autoSave(e);
        return;
    }

    return (
        <>
            <>
                <div className='note-display'>
                    <input
                        value={title}
                        className='note-title'
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={titleSave}
                        type='text'
                    />
                    <div className='note-buttons'>
                        <button type='button' onClick={titleSave}>Save Title</button>
                        <button type='button' onClick={contentSave}>Save Content</button>
                        <button type='button' onClick={autoSave}>Auto Save</button>
                    </div>
                    <textarea
                        value={content}
                        className='note-content'
                        onChange={handleContentChange}
                    />
                </div>
            </>
        </>
    )
}

export default NoteDisplay;
