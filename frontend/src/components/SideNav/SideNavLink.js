import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { editBook } from '../../store/notebooks';
import { msg } from '../../store/message';

const SideNavLink = ({ id, idx, handleDelete, books }) => {

    useEffect(() => {
        const field = document.getElementById(`${id}-edit-field`);
        if (field) {
            field.focus();
        }
    })

    const dispatch = useDispatch();

    const [edit, setEdit] = useState(false);
    const [editText, setEditText] = useState(books[id].name)

    // useEffect(() => {
    //     console.log(edit);
    // }, [edit])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editText === books[id].name) return;

        const payload = {
            bookId: id,
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
        <div className='book-link-div'>
            {!edit ?
                <NavLink to={`/notebooks/${id}`}>
                    {books[id].name}
                </NavLink> :
                <form onSubmit={handleSubmit} className='edit-form'>
                    <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={(e) => {
                            setEdit(false)
                            setEditText(books[id].name)
                            dispatch(msg(null, null, 'no'))
                        }}
                        id={`${id}-edit-field`}
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

                <button type='button' onClick={(e) => {
                    setEdit(!edit)
                }}>Edit</button>

                <button type='button' onClick={(e) => handleDelete(id)}>Del</button>
            </div>
        </div>
    )
}

export default SideNavLink;
