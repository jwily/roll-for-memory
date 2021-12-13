import React from "react";
import { NavLink } from "react-router-dom";

import './NoteCard.css'

const NoteCard = ({ note }) => {

    return (
        <NavLink to={`/notebooks/${note.notebookId}/notes/${note.id}`} className='note-card'>
            <div className='name-holder'>
                <span className='card-name'>{
                    (note.name && (note.name.length < 40 ? note.name : note.name.slice(0, 40) + ' (...)'))
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
