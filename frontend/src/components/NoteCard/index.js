import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

import './NoteCard.css'

const NoteCard = ({ note, idx }) => {

    const card = useRef(null);

    useEffect(() => {
        const fadeIn = setTimeout(() => {
            card.current.style.opacity = 1;
            card.current.style.transition = 'background-color .35s, opacity .75s';
        }, 100 + 50 * idx)
        return () => clearTimeout(fadeIn);
    }, [idx])

    return (
        <NavLink ref={card} to={`/notebooks/${note.notebookId}/notes/${note.id}`} className='note-card'>
            <div className='name-holder'>
                <span className='card-name'>{
                    note.name
                    || 'Untitled'
                }</span>
            </div>
            <div className='content-holder'>
                <div className='card-content'>{note.content}</div>
            </div>
        </NavLink >
    )
}

export default NoteCard;
