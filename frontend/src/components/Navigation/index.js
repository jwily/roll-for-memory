import React from 'react';
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
            <span className='logo-top'>roll for memory</span>
            {isLoaded && (
                sessionUser && <ProfileButton user={sessionUser} />
            )}
        </div>
    );
}

export default Navigation;
