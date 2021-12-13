import React from "react";
import { NavLink } from "react-router-dom";

import './NoteCard.css'

const NoteCard = ({ note }) => {

    return (
        <NavLink to={`/notebooks/${note.notebookId}/notes/${note.id}`} className='note-card'>
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
