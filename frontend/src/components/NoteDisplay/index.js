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

    const notes = useSelector(state => state.notes);

    // Will this be a problem for bad urls?
    const { bookId, noteId } = useParams('');
    const note = notes[noteId];

    const [title, setTitle] = useState('');
    const [savedTitle, setSavedTitle] = useState('');
    const [content, setContent] = useState('');
    const [savedContent, setSavedContent] = useState('');
    const [saving, setSaving] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {
        if (note) {
            if (note.name) {
                setTitle(note.name);
                setSavedTitle(note.name);
            }
            else {
                setTitle('Untitled');
                setSavedTitle('Untitled');
            }
        }
    }, [note])

    useEffect(() => {
        if (note) {
            if (note.content) {
                setContent(note.content);
                setSavedContent(note.content);
            }
            else {
                setContent('Let your thoughts flow...');
                setSavedContent('Let your thoughts flow...');
            }
        }
    }, [note])

    useEffect(() => {
        if (content && (content !== savedContent)) {
            setSaving(true);
            console.log('Saving...')
            if (!saving) {
                setTimeout(() => {
                    setSaving(false);
                    const toSave = document.getElementById('content').value;
                    contentSave(toSave);
                    setSavedContent(toSave);
                    console.log('Saved!');
                }, 500)
            }
        }
    }, [content])

    if (!(noteId in notes)
        || notes[noteId].notebookId.toString() !== bookId
    ) return <Redirect to='/' />

    // useEffect(() => {
    //     setSaving(true);
    //     console.log('Saving...')
    //     if (!saving) {
    //         setTimeout(() => {
    //             setSaving(false);
    //             const text = document.getElementById('content').value
    //             contentSave(text);
    //         }, 500)
    //     }
    // }, [content])

    const titleSave = () => {
        if (title && title !== savedTitle) {
            setSavedTitle(title);
            const payload = { noteId: note.id, name: title };
            dispatch(editNote(payload))
        }
    }

    const contentSave = (toSave) => {
        const payload = { noteId: note.id, content: toSave };
        dispatch(editNote(payload))
    }

    const titleFocus = () => {
        if (title === 'Untitled') {
            setTitle('');
        }
        dispatch(msg("Press 'Return' or click away to save", 'normal', 'yes'))
    }

    const contentFocus = () => {
        if (content === 'Let your thoughts flow...') {
            setContent('');
        }
    }

    const delay = (ms) => {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, ms);
        })
    };

    // const autoSave = (e) => {
    //     setSaving(true);
    //     console.log('Saving...')
    //     if (!saving) {
    //         delay(3000).then(() => {
    //             setSaving(false)
    //             const saved = contentSave()
    //             setSavedContent(saved)
    //             console.log('Saved!')
    //         })
    //     }
    // }

    // // const contentChange = (e) => {
    //     setContent(e.target.value);
    //     if (content !== savedContent) {
    //         setSaving(true);
    //         console.log('Saving')
    //         if (!saving) {
    //             delay(1000).then(() => {

    //                 console.log('Saved!');
    //             })
    //         }
    //     }
    // }

    // const handleContentChange = (e) => {
    //     setContent(e.target.value);
    //     autoSave(e);
    //     return;
    // }

    // const keySave = (e) => {
    //     if (e.ctrlKey && e.key === 83) {
    //         e.preventDefault();
    //         console.log('Saved!');
    //     }
    // }

    const deleteToggle = (e) => {
        setShowDelete(true);
    }

    const cancelDelete = (e) => {
        setShowDelete(false);
    }

    const remove = (e) => {
        dispatch(removeNote(note.id))
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
                        titleSave();
                        dispatch(msg(null, null, 'no'));
                    }}
                    type='text'
                    onFocus={titleFocus}
                />
                <button>Submit</button>
            </form>
            {
                showDelete ?
                    <div className='note-buttons'>
                        <span>Are you sure you want to delete this note?</span>
                        <button type='button' onClick={remove}>Yup</button>
                        <button type='button' onClick={cancelDelete}>Nope</button>
                    </div> :
                    <div className='note-buttons'>
                        <button type='button' onClick={(e) => { contentSave(content) }}>Save Content</button>
                        {/* <button type='button' onClick={autoSave}>Auto Save Test</button> */}
                        <button type='button' onClick={remove}>Delete</button>
                    </div>
            }

            <textarea
                value={content}
                className='note-content'
                onChange={(e) => setContent(e.target.value)}
                id='content'
                onFocus={contentFocus}
            />
        </div >
    )
}

export default NoteDisplay;
