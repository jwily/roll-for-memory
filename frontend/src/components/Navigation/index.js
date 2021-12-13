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
            <span className='logo-top nav-side'>roll for memory</span>
            <span className='nav-side nav-left'>
                {isLoaded && (
                    sessionUser && <ProfileButton user={sessionUser} />
                )}
            </span>
        </div>
    );
}

export default Navigation;
