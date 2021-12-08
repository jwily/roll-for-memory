import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    // let sessionLinks;
    // if (sessionUser) {
    //     sessionLinks = (
    //         <ProfileButton user={sessionUser} />
    //     );
    // } else {
    //     sessionLinks = (
    //         <>
    //             {/* <NavLink to="/login">Log In</NavLink> */}
    //             <NavLink to="/signup">Sign Up</NavLink>
    //         </>
    //     );
    // }

    return (
        <div className='navigation'>
            <NavLink exact to="/" activeClassName="nav-home">roll for memory</NavLink>
            {isLoaded && (
                sessionUser ? <ProfileButton user={sessionUser} /> : <NavLink to='/signup' activeClassName='nav-signup'>sign up</NavLink>
            )}
        </div>
    );
}

export default Navigation;
