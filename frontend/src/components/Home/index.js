import React from 'react';
import './HomePage.css'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getNotes } from '../../store/notes';
import { getNotebooks } from '../../store/notebooks';
import { Switch, Route, Redirect } from 'react-router-dom';
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

    const [notesLoaded, setNotesLoaded] = useState(false);
    const [booksLoaded, setBooksLoaded] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        dispatch(getNotebooks()).then(() => setBooksLoaded(true));
    }, [dispatch])

    useEffect(() => {
        dispatch(getNotes()).then(() => setNotesLoaded(true));
    }, [dispatch])

    return (
        <>
            <Navigation isLoaded={isLoaded} message={message} error={error} setMessage={setMessage} />
            <div className='home-page'>
                <div className='books-width'>
                    {booksLoaded && <SideNav setMessage={setMessage} setError={setError} />}
                </div>
                <Switch>
                    <Route path='/notebooks/:bookId'>
                        <div className='notes-width'>
                            {notesLoaded && <NotesList />}
                        </div>
                    </Route>
                    <Route path='/'>
                        <div className='notes-width'>
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
                        <HomeDisplay />
                    </Route>
                </Switch>
            </div>
        </>
    )
};

export default HomePage;
