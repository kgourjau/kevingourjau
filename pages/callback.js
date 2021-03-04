import React, {useState, useEffect} from 'react';

function LogoutContainer({children}) {
    useEffect(() => {
        console.log("component mounted")
        window.onload = () => {
            if(window.opener !== null)
            {
                window.opener.postMessage("logout successful")
                window.close()
            }
        }

    });
    return (
        <>
            {children}
        </>
    )
}

function Logout() {
    return (
        <LogoutContainer></LogoutContainer>
    )
}

export default Logout