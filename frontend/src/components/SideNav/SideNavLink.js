import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { editBook } from '../../store/notebooks';
import { set } from "js-cookie";

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

        if (e.target.value === books[id].name) return;

        const payload = {
            bookId: id,
            name: editText
        }

        const response = await dispatch(editBook(payload));

        if ('errors' in response) {
            console.log(response.errors);
        } else {
            setEdit(false);
            return response;
        }
    }

    return (
        <div className='book-link-div'>
            {!edit ?
                <NavLink to={`/notebooks/${id}`}>
                    {books[id].name}
                </NavLink> :
                <form onSubmit={handleSubmit} >
                    <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={(e) => {
                            setEdit(false)
                        }}
                        id={`${id}-edit-field`}
                    />
                    <button >Submit</button>
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
