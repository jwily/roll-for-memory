import React, { useEffect } from "react";

const No = () => {

    useEffect(() => {
        document.getElementById('no').style.opacity = 1;
    }, [])

    return (
        <span id='no'>No</span>
    )
}

export default No;
