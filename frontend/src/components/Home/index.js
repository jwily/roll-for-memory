import React from 'react';
import './HomePage.css'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getNotes } from '../../store/notes';
import { getNotebooks } from '../../store/notebooks';
import { Switch, Route } from 'react-router-dom';
// import { useState } from 'react';

import SideNav from '../SideNav';
import NotesList from '../NotesList';
import HomeNotesList from '../HomeNotesList';
import NoteDisplay from '../NoteDisplay';
import Navigation from '../Navigation';

const HomePage = ({ isLoaded }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNotes());
    }, [dispatch])

    useEffect(() => {
        dispatch(getNotebooks());
    }, [dispatch])

    return (
        <>
            <Navigation isLoaded={isLoaded} />
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
                <Switch>
                    <Route path='/notebooks/:bookId/notes/:noteId'>
                        <NoteDisplay />
                    </Route>
                    <Route path='/notebooks/:bookId/'>
                        <div className='note-display'>
                            <span>Notebook</span>
                        </div>
                    </Route>
                    <Route path='/'>
                        <div className='note-display'>
                            <span>Home</span>
                        </div>
                    </Route>
                </Switch>
            </div>
        </>
    )
};

export default HomePage;
