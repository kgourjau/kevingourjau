import auth0 from "auth0-js"
import React, {useState, useEffect} from 'react';

function callback() {
    let webAuth = new auth0.WebAuth({
        domain: 'kgourjau.eu.auth0.com',
        clientID: 'sEARmkGfYyJ0HM1LRg5QrdEBxx62ECFO'
    });
    webAuth.popup.callback();
}

function LoginContainer({children}) {
    useEffect(() => {
        // Update the document title using the browser API
        console.log("UseEffect on popup")
        callback()
    });
    return (
        <>
            {children}
        </>
    )
}

function Demo() {
    return (
        <LoginContainer></LoginContainer>
    )
}

export default Demo