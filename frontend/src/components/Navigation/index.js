import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const content = useSelector(state => state.message.content);
    const style = useSelector(state => state.message.style);
    const vis = useSelector(state => state.message.vis);

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
            <span className='logo-top nav-side' id='nav-logo'>roll for memory</span>
            <span className={`nav-msg msg-${style} msg-${vis}`}>{content}</span>
            {isLoaded && (
                sessionUser &&
                <span className='nav-side nav-right'>
                    <ProfileButton user={sessionUser} />
                </span>
            )}
        </div>
    );
}

export default Navigation;
