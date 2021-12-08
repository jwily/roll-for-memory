import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import { getNotes } from '../../store/notes';

import './LoginForm.css';

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/" />
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <div className='login-main centered'>
            <h2 className='title'>roll for memory</h2>
            <div className='login-banner'></div>
            <form onSubmit={handleSubmit} className='login-form'>
                <ul>
                    {/*
                What's the idx doing here?
                Oh cool, you can access the element index like that.
                */}
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label htmlFor='username'
                    className='login-text'>
                    Username or Email
                </label>
                <input
                    className='login-input'
                    id='username'
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                />
                <label htmlFor='password'
                    className='login-text'>
                    Password
                </label>
                <input
                    className='login-input'
                    id='password'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className='login-button'>Log In</button>
            </form>
        </div >
    );
}

export default LoginFormPage;
