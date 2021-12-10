import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createBook } from '../../store/notebooks';

import './SideNav.css'

const SideNav = () => {
    const dispatch = useDispatch();

    const [newBookName, setNewBookName] = useState('');

    const books = useSelector(state => state.books);

    const sortByName = (array) => {
        return array.sort((idA, idB) => {
            if (books[idA].name < books[idB].name) return -1;
            if (books[idA].name > books[idB].name) return 1;
            return 0;
        })
    };

    const unsorted = Object.keys(books);
    const sorted = sortByName(unsorted)

    const handleCreate = async () => {
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
            {/* Let's try this input with a post request onBlur */}
            <div className='book-create-div display-banner'>
                <input type='text' placeholder='Create a notebook' value={newBookName} onChange={(e) => setNewBookName(e.target.value)} />
                <button type='button' onClick={handleCreate}>Submit</button>
            </div>
            <div className='books-list'>
                <NavLink exact to='/'>Home</NavLink>
                {
                    sorted.map((id, idx) => {
                        return <NavLink key={idx} to={`/notebooks/${id}`}>{books[id].name}</NavLink>
                    })
                }
            </div>
        </div >
    )
}

export default SideNav;
