import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from "react-router";

import './Navigation.css'

function ProfileButton({ user }) {
    const history = useHistory();

    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/');
    };

    return (
        <>
            <button onClick={openMenu} className='profile-button nav-button'>
                <i className="fas fa-user-circle" />
            </button>
            {showMenu && (
                <div className="profile-dropdown">
                    <ul >
                        <li>{user.username}</li>
                        <li>{user.email}</li>
                        <li>
                            <button onClick={logout} className='login-button sign-out-button'>Log Out</button>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}

export default ProfileButton;
