import React from 'react';
import './HomePage.css'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getNotes } from '../../store/notes';
import { Route } from 'react-router';

import SideNav from '../SideNav';
import NotesList from '../NotesList';

const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        return dispatch(getNotes())
    }, [dispatch])

    return (
        <div className='home-page centered'>
            <SideNav />
            <NotesList />
            <h1>I'm Working!</h1>
        </div>
    )
};

export default HomePage;
