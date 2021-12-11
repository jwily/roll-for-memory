import React from "react";
import { NavLink } from "react-router-dom";

const SideNavLink = ({ id, idx, handleDelete, books }) => {

    return (
        <div key={`book-${idx}-div`} className='book-link-div'>
            <NavLink key={idx} to={`/notebooks/${id}`}>
                {books[id].name}
            </NavLink>
            <div key={`book-${id}-btns`} className='book-link-btns'>
                <button key={`book-${id}-edit`} type='button'>Edit</button>
                <button key={`book-${id}-del`} type='button' onClick={(e) => handleDelete(id)}>Del</button>
            </div>
        </div>
    )
}

export default SideNavLink;
