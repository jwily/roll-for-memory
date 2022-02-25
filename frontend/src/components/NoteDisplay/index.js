import React, { useEffect } from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editNote, removeNote } from '../../store/notes';
import { msg } from '../../store/message';

import './NoteDisplay.css';

const NoteDisplay = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const notes = useSelector(state => state.notes.entities);

    // Will this be a problem for bad urls?
    const { bookId, noteId } = useParams();
    const note = notes[noteId];

    const [title, setTitle] = useState('');
    // const [savedTitle, setSavedTitle] = useState('');
    const [content, setContent] = useState('');
    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {
        if (!showDelete) return;

        const hideMessage = () => {
            dispatch(msg(null, null, 'no'));
            setShowDelete(false);
        };

        document.addEventListener('click', hideMessage);

        return () => document.removeEventListener('click', hideMessage);

    }, [showDelete, dispatch])

    useEffect(() => {
        if (note) {
            if (note.name) {
                setTitle(note.name);
                // setSavedTitle(note.name);
            }
            else {
                setTitle('Untitled');
                // setSavedTitle('Untitled');
            }
        }
    }, [note])

    useEffect(() => {
        if (note) {
            setContent(note.content);
        }
    }, [note])

    if (!(noteId in notes)
        || notes[noteId].notebookId.toString() !== bookId
    ) return <Redirect to='/' />

    const titleSave = async () => {
        const payload = { noteId: note.id, name: title, content };
        const response = await dispatch(editNote(payload));
        if ('errors' in response) {
            dispatch(msg(response.errors[0], 'error', 'yes'))
        } else {
            // setSavedTitle(title);
            dispatch(msg('Saved!', 'normal', 'yes'))
            delay(500).then(() => dispatch(msg(null, null, 'no')))
            return response;
        }
    }

    const contentSave = (toSave) => {
        const payload = { noteId: note.id, content: toSave, title };
        dispatch(editNote(payload))
    }

    const titleFocus = () => {
        if (title === 'Untitled') {
            setTitle('');
        }
        dispatch(msg("Press 'Return' to save", 'normal', 'yes'))
        setShowDelete(false);
    }

    const contentFocus = () => {
        dispatch(msg("Press 'CTRL+S' or 'Command+S' to save", 'normal', 'yes'))
        setShowDelete(false);
    }

    const contentBlur = () => {
        dispatch(msg(null, null, 'no'));
    }

    const delay = (ms) => {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, ms);
        })
    };

    const keyDownSave = (e) => {
        let charCode = String.fromCharCode(e.which).toLowerCase();
        if ((e.ctrlKey || e.metaKey) && charCode === 's') {
            e.preventDefault();
            dispatch(msg('Saved!', 'normal', 'yes'))
            delay(500).then(() => dispatch(msg(null, null, 'no')))
            contentSave(content);
        }
    }

    const deleteToggle = (e) => {
        setShowDelete(true);
        dispatch(msg(`Are you sure you want to delete '${title.length < 25 ? title : title.slice(0, 25) + " ..."}' ? `, 'normal', 'yes'))
    }

    const cancelDelete = (e) => {
        setShowDelete(false);
        dispatch(msg(null, null, 'no'))
    }

    const remove = async (e) => {
        await dispatch(removeNote(note.id))
        history.push(`/notebooks/${bookId}`)
    }

    return (
        <div className='note-display'>
            <form className='title-form'
                onSubmit={(e) => {
                    e.preventDefault();
                    titleSave();
                }}>
                <input
                    value={title}
                    className='note-title'
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={(e) => {
                        dispatch(msg(null, null, 'no'));
                        if (!title) setTitle('Untitled')
                    }}
                    type='text'
                    onFocus={titleFocus}
                />
                <button>Submit</button>
            </form>
            {
                showDelete ?
                    <div className='note-buttons'>
                        <button type='button' onClick={remove}>Yes</button>
                        <button type='button' onClick={cancelDelete}>No, keep '{title.length < 50 ? title : title.slice(0, 50) + ' ...'}'</button>
                    </div> :
                    <div className='note-buttons'>
                        <button type='button' onClick={(e) => {
                            dispatch(msg('Saved!', 'normal', 'yes'))
                            delay(500).then(() => dispatch(msg(null, null, 'no')))
                            contentSave(content);
                        }}>Save</button>
                        {/* <button type='button' onClick={autoSave}>Auto Save Test</button> */}
                        <button type='button' onClick={deleteToggle}>Delete</button>
                    </div>
            }

            <textarea
                value={content}
                className='note-content'
                onChange={(e) => {
                    setContent(e.target.value);
                }}
                onKeyDown={keyDownSave}
                onBlur={contentBlur}
                onFocus={contentFocus}
                id='content'
            />
        </div >
    )
}

export default NoteDisplay;
