import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './SideNav.css'

const SideNav = () => {

    const [newBookName, setNewBookName] = useState('');

    const books = useSelector(state => state.books);

    return (
        <div className='side-nav'>
            {/* Let's try this input with a post request onBlur */}
            <input type='text' placeholder='Create a notebook' value={newBookName} onChange={(e) => setNewBookName(e.target.value)} />
            <NavLink exact to='/'>Home</NavLink>
            {
                books.booksOrder.map((id, idx) => {
                    return <NavLink key={idx} to={`/notebooks/${id}`}>{books[id].name}</NavLink>
                })
            }
        </div >
    )
}

export default SideNav;
