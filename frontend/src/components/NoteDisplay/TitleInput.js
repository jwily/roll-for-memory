import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const TitleInput = () => {

    const { noteId } = useParams();

    // setTitle()

    return (
        <input
            id='title-input'
            type='text'
        />
    )
};

export default TitleInput;
