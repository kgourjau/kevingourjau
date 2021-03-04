// This default export is required in a new `pages/_app.js` file.
import {AppWrapper, useAppContext} from "../lib/user.js"
// import {AppWrapper, useAppContext} from "../lib/AppContext"
import React, { createContext, useContext,useState, useEffect } from 'react'

// const AppContext = React.createContext({
// });


export default function MyApp({Component, pageProps}) {
    // const [language, setLanguage] = useState("en");
    // const value = { language, setLanguage };

    return (
        <AppWrapper>
            <Component {...pageProps} />
        </AppWrapper>

    // <AppWrapper>
    //     <Component {...pageProps} />
    // </AppWrapper>
    )
}