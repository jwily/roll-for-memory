import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const SideNavDisplay = () => {
    const { bookId } = useParams();
    const book = useSelector((state) => state.books)[bookId];

    console.log(book);

    const createNote = () => {

    }

    return (
        <div>
            <button>Create New Note</button>
        </div>
    )
}

export default SideNavDisplay;
