import React from "react";
import { NavLink } from "react-router-dom";

const SideNavLink = ({ id, handleDelete, books }) => {

    return (
        <div className='book-link-div'>
            <NavLink to={`/notebooks/${id}`}>
                {books[id].name}
            </NavLink>
            <div className='book-link-btns'>
                <button type='button'>Edit</button>
                <button type='button' onClick={(e) => handleDelete(id)}>Del</button>
            </div>
        </div>
    )
}

export default SideNavLink;
