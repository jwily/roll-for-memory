import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { createNote } from '../../store/notes';

const SideNavDisplay = () => {
    const history = useHistory();

    const dispatch = useDispatch();

    const { bookId } = useParams();
    const book = useSelector((state) => state.books)[bookId];

    const clickHandler = async () => {
        const note = await dispatch(createNote(book.id));
        history.push(`/notebooks/${book.id}/notes/${note.id}`);
    }

    return (
        <div className='display'>
            <div className='display-banner'></div>
            <div className='display-body'>
                <button type='button' onClick={clickHandler}>Create New Note</button>
            </div>
        </div >
    )
}

export default SideNavDisplay;
