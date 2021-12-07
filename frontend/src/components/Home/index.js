import React from 'react';
import './HomePage.css'

import SideNav from '../SideNav';
import NotesList from '../NotesList';

const HomePage = () => {
    return (
        <div className='homePage'>
            <SideNav />
            <NotesList />
            <h1>I'm Working!</h1>
        </div>
    )
};

export default HomePage;
