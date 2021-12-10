import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createBook } from '../../store/notebooks';

import './SideNav.css'

const SideNav = () => {
    const dispatch = useDispatch();

    const [newBookName, setNewBookName] = useState('Create Notebook');

    const books = useSelector(state => state.books);

    const sortByName = (array) => {
        return array.sort((idA, idB) => {
            if (books[idA].name < books[idB].name) return -1;
            if (books[idA].name > books[idB].name) return 1;
            return 0;
        })
    };

    const handleBlur = () => {
        setNewBookName('Create Notebook');
    }

    const handleFocus = () => {
        setNewBookName('');
    }

    const unsorted = Object.keys(books);
    const sorted = sortByName(unsorted)

    const handleCreate = async (e) => {
        e.preventDefault();
        const response = await dispatch(createBook(newBookName));
        if ('errors' in response) {
            console.log(response.errors);
        } else {
            setNewBookName('');
            return response;
        }
    }

    return (
        <div className='side-nav'>
            <div className='side-top'>
                <form className="book-create"
                    onSubmit={handleCreate}>
                    <input type='text' value={newBookName}
                        onChange={(e) => setNewBookName(e.target.value)}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        id='create-note-field' />
                    <button>Submit</button>
                </form>
            </div>
            <div className='books-list'>
                <NavLink exact to='/'>Home</NavLink>
                {
                    sorted.map((id, idx) => {
                        return (
                            <div className='book-link-div'>
                                <NavLink key={idx} to={`/notebooks/${id}`}>
                                    {books[id].name.length < 20 ? books[id].name : books[id].name.slice(0, 20) + '...'}
                                </NavLink>
                                <div className='book-link-btns'>
                                    <button type='button'>Edit</button>
                                    <button type='button'>Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}

export default SideNav;
