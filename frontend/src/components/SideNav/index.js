import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './SideNav.css'

const SideNav = () => {

    const books = useSelector(state => state.books);

    // if (!books) return null;

    return (
        <div className='side-nav'>
            <h2>SideNav</h2>
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
