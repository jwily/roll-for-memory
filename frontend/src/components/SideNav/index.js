import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { createBook, removeBook } from '../../store/notebooks';
import { removeBookNotes } from '../../store/notes';
import SideNavLink from './SideNavLink';

import './SideNav.css'

const SideNav = ({ setMessage, setError }) => {

    const dispatch = useDispatch();
    const history = useHistory();

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
        setMessage('')
    }

    const handleFocus = () => {
        setNewBookName('');
        setMessage('create-book')
    }

    const order = Object.keys(books);
    sortByName(order);

    const handleCreate = async (e) => {
        e.preventDefault();
        const response = await dispatch(createBook(newBookName));
        if ('errors' in response) {
            setMessage(response.errors[0]);
        } else {
            setNewBookName('');
            setMessage('create-book')
            return response;
        }
    }

    const handleDelete = async (bookId) => {
        dispatch(removeBook(bookId));
        dispatch(removeBookNotes(bookId));
        history.push('/');
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
                        id='create-note-field'
                        autoComplete='off' />
                    <button>Submit</button>
                </form>
            </div>
            <div className='books-list'>
                <div className='book-link-div'>
                    <NavLink exact to='/'>ALL NOTES</NavLink>
                </div>
                {
                    order.map((id, idx) => {
                        return <SideNavLink books={books} id={id} key={idx} handleDelete={handleDelete} />
                    })
                }
            </div>
        </div >
    )
}

export default SideNav;
