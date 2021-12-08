import React from 'react';
import './HomePage.css'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getNotes } from '../../store/notes';
import { getNotebooks } from '../../store/notebooks';
import { Switch, Route } from 'react-router-dom';

import SideNav from '../SideNav';
import NotesList from '../NotesList';
import HomeNotesList from '../HomeNotesList';

const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNotes());
    }, [dispatch])

    useEffect(() => {
        dispatch(getNotebooks());
    }, [dispatch])

    return (
        <div className='home-page centered'>
            <SideNav />
            <Switch>
                <Route path='/notebooks/:bookId'>
                    <NotesList />
                </Route>
                <Route path='/'>
                    <HomeNotesList />
                </Route>
            </Switch>
            <h1>I'm Working!</h1>
        </div>
    )
};

export default HomePage;
