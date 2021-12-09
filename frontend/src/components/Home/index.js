import React from 'react';
import './HomePage.css'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getNotes } from '../../store/notes';
import { getNotebooks } from '../../store/notebooks';
import { Switch, Route } from 'react-router-dom';
import { useState } from 'react';

import SideNav from '../SideNav';
import SideNavDisplay from '../SideNav/SideNavDisplay';
import NotesList from '../NotesList';
import HomeNotesList from '../HomeNotesList';
import NoteDisplay from '../NoteDisplay';
import Navigation from '../Navigation';

const HomePage = ({ isLoaded }) => {

    const dispatch = useDispatch();

    const [notesLoaded, setNotesLoaded] = useState(false);
    const [booksLoaded, setBooksLoaded] = useState(false);

    useEffect(() => {
        dispatch(getNotebooks()).then(() => setBooksLoaded(true));
    }, [dispatch])

    useEffect(() => {
        dispatch(getNotes()).then(() => setNotesLoaded(true));
    }, [dispatch])

    return (
        <>
            <Navigation isLoaded={isLoaded} />
            <div className='home-page centered'>
                <div className='hold-width'>
                    {booksLoaded && <SideNav />}
                </div>
                <Switch>
                    <Route path='/notebooks/:bookId'>
                        <div className='hold-width'>
                            {notesLoaded && <NotesList />}
                        </div>
                    </Route>
                    <Route path='/'>
                        <div className='hold-width'>
                            {notesLoaded && <HomeNotesList />}
                        </div>
                    </Route>
                </Switch>
                <Switch>
                    <Route path='/notebooks/:bookId/notes/:noteId'>
                        {notesLoaded && <NoteDisplay />}
                    </Route>
                    <Route path='/notebooks/:bookId/'>
                        <SideNavDisplay />
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
