import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { createBook, removeBook } from '../../store/notebooks';
import { removeBookNotes } from '../../store/notes';
import SideNavLink from './SideNavLink';
import { msg } from '../../store/message';

import './SideNav.css'

const SideNav = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [newBookName, setNewBookName] = useState('Create Notebook');

    const data = useSelector(state => state.books);

    const handleBlur = () => {
        setNewBookName('Create Notebook');
        dispatch(msg(null, null, 'no'))
    }

    const handleFocus = () => {
        setNewBookName('');
        dispatch(msg("Press 'Return' to create", 'normal', 'yes'))
    }

    const handleCreate = async (e) => {
        e.preventDefault();
        const response = await dispatch(createBook(newBookName));
        if ('errors' in response) {
            dispatch(msg(response.errors[0], 'error', null))
        } else {
            setNewBookName('');
            dispatch(msg("Press 'Return' to create", 'normal', 'yes'))
            return response;
        }
    }

    const booksList = useMemo(() => {

        const handleDelete = async (bookId) => {
            dispatch(removeBook(bookId));
            dispatch(removeBookNotes(bookId));
            history.push('/');
        }

        return data.ids.map((id) => {
            const book = data.entities[id];
            return <SideNavLink book={book} key={id} handleDelete={handleDelete} />
        })
    }, [data.entities, data.ids, dispatch, history])

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
                <NavLink exact to='/' className='side-title'>Home</NavLink>
                {booksList}
            </div>
        </div >
    )
}

export default SideNav;
