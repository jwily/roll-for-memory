import React from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { Yes, No, CreateBook, EmptyName, DupName } from './messages'

import './Navigation.css';

function Navigation({ isLoaded, message, error, setMessage }) {

    // const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);

    // const content = useSelector(state => state.message.content);
    // const style = useSelector(state => state.message.style);

    // const handleYes = () => {
    //     const span = document.getElementById('message-span');
    //     dispatch(loadMsg('Yes', 'yes'))
    // };

    // const handleNo = () => {
    //     const span = document.getElementById('message-span');
    //     dispatch(loadMsg('No', 'yes'))
    // };

    return (
        <div className='navigation'>
            <span className='logo-top nav-side'>roll for memory</span>
            {message === 'Yes' && <Yes />}
            {message === 'No' && <No />}
            {message === 'create-book' && <CreateBook />}
            {message === 'empty' && <EmptyName />}
            {message === 'dup' && <DupName />}
            {/* <button type='button' onClick={(e) => setMessage('Yes')}>Yes</button> */}
            {/* <button type='button' onClick={(e) => setMessage('No')}>No</button> */}
            <span className='nav-side nav-left'>
                {isLoaded && (
                    sessionUser && <ProfileButton user={sessionUser} />
                )}
            </span>
        </div >
    );
}

export default Navigation;
