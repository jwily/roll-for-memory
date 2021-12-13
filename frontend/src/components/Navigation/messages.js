import React, { useEffect } from "react";

export const Yes = () => {

    useEffect(() => {
        document.getElementById('yes').style.opacity = 1;
    }, [])

    return (
        <span className='nav-msg' id='yes'>Yes</span>
    )
}

export const No = () => {

    useEffect(() => {
        document.getElementById('no').style.opacity = 1;
    }, [])

    return (
        <span className='nav-msg' id='no'>No</span>
    )
}

export const CreateBook = () => {

    useEffect(() => {
        document.getElementById('create-book').style.opacity = 1;
    }, [])

    return (
        <span className='nav-msg' id='create-book'>Press 'Return' to create</span>
    )
}

export const EmptyName = () => {

    return (
        <span className='nav-msg error-msg'>Your new notebook needs a name</span>
    )
}

export const DupName = () => {

    return (
        <span className='nav-msg error-msg'>Another notebook already has that name</span>
    )
}
