import React from 'react';
import './HomePage.css'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getNotebooks } from '../../store/notebooks';
import { Switch, Route } from 'react-router-dom';
import { useState } from 'react';

import SideNav from '../SideNav';
import SideNavDisplay from '../SideNav/SideNavDisplay';
import HomeNotesList from '../HomeNotesList';
import HomeDisplay from './HomeDisplay';
import Navigation from '../Navigation';
import NoteDisplay from '../NoteDisplay';
import NotesList from '../NotesList';

const HomePage = ({ isLoaded }) => {

    const dispatch = useDispatch();

    const [booksLoaded, setBooksLoaded] = useState(false);

    useEffect(() => {
        dispatch(getNotebooks()).then(() => setBooksLoaded(true));
    }, [dispatch])

    return (
        <>
            <Navigation isLoaded={isLoaded} />
            <div className='home-page'>
                <div className='books-width'>
                    {booksLoaded && <SideNav />}
                </div>
                <Switch>
                    <Route path='/notebooks/:bookId'>
                        <div className='notes-width'>
                            <NotesList />
                        </div>
                    </Route>
                    <Route path='/'>
                        <div className='notes-width'>
                            <HomeNotesList />
                        </div>
                    </Route>
                </Switch>
                <Switch>
                    <Route path='/notebooks/:bookId/notes/:noteId'>
                        <NoteDisplay />
                    </Route>
                    <Route path='/notebooks/:bookId/'>
                        <SideNavDisplay />
                    </Route>
                    <Route path='/'>
                        <HomeDisplay />
                    </Route>
                </Switch>
            </div>
        </>
    )
};

export default HomePage;
