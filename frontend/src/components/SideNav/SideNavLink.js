import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { editBook } from '../../store/notebooks';
import { msg } from '../../store/message';

import { removeBook } from "../../store/notebooks";
import { removeBookNotes } from "../../store/notes";

import './SideLink.css'

const SideNavLink = ({ book }) => {

    const history = useHistory();

    useEffect(() => {
        const field = document.getElementById(`${book.id}-edit-field`);
        if (field) {
            field.focus();
        }
    })

    const dispatch = useDispatch();

    const [edit, setEdit] = useState(false);
    const [editText, setEditText] = useState(book.name)
    const [del, setDel] = useState(false);

    // useEffect(() => {
    //     console.log(edit);
    // }, [edit])

    const handleDelete = async () => {
        await dispatch(removeBook(book.id));
        dispatch(removeBookNotes(book.id));
        history.push('/');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editText === book.name) return setEdit(false);

        const payload = {
            bookId: book.id,
            name: editText
        }

        const response = await dispatch(editBook(payload));

        if ('errors' in response) {
            dispatch(msg(response.errors[0], 'error', null))
        } else {
            setEdit(false);
            dispatch(msg(null, null, 'no'))
            return response;
        }
    }

    return (
        <>
            {!edit ?
                <NavLink to={`/notebooks/${book.id}`}
                    className='book-link'>
                    <div className='book-name-holder'>
                        <span className='book-name'>{book.name}</span>
                    </div>
                </NavLink> :
                <form onSubmit={handleSubmit} className='edit-form'>
                    <input
                        spellcheck="false"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={(e) => {
                            setEdit(false)
                            dispatch(msg(null, null, 'no'))
                        }}
                        id={`${book.id}-edit-field`}
                        onFocus={(e) => {
                            dispatch(msg("Press 'Return' to save", 'normal', 'yes'))
                        }}
                        autoComplete='off'
                        type='text'
                    />
                    <button>Submit</button>
                </form>
            }
            <div className='book-link-btns'>
                {!del && <>
                    <button type='button' onClick={(e) => {
                        setEdit((!edit))
                        setEditText(book.name)
                    }}>Edit</button>
                    <button type='button' onClick={(e) => setDel(true)}>Delete</button>
                </>}
                {del && <>
                    <button type='button' onClick={(e) => setDel(false)}>Cancel Delete</button>
                    <button type='button' onClick={handleDelete}>Confirm</button>
                </>}
            </div>
        </>
    )
}

export default SideNavLink;
