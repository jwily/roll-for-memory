import React, { useState, useEffect } from 'react';
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
    const [imgNum, setImgNum] = useState(0);
    const [errorsLoaded, setErrorsLoaded] = useState(false)

    useEffect(() => {
        setImgNum(Math.floor(Math.random() * 3));
    }, [])

    const images = ['grid', 'uldah', 'limsa'];

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
                setErrorsLoaded(true);
            });
    }

    return (
        <div className='login-main centered'>
            <h2 className='title'>roll for memory</h2>
            <div className='sub-holder'>
                {!errorsLoaded ?
                    <span className='sub-title'>Dream your world. Plan your sessions. Roll for initiative.</span> :
                    <span className='sub-title sub-error'>The provided credentials were invalid.</span>
                }
            </div>
            <div className={`login-banner ${images[imgNum]}`}></div>
            <form onSubmit={handleSubmit} className='login-form'>
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
