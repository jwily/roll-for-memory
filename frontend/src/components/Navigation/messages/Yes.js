import React, { useEffect } from "react";

const Yes = () => {

    useEffect(() => {
        document.getElementById('yes').style.opacity = 1;
    }, [])

    return (
        <span id='yes'>Yes</span>
    )
}

export default Yes;
