import React, { createContext, useContext,useState, useEffect } from 'react'
import {login} from "./user.js";

const AppContext = createContext();

export function AppWrapper({ children }) {
    const [language, setLanguage] = useState("en");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(null);

    fetchUser().then((user) => {
        // Only set the user if the component is still mounted
            // When the user is not logged in but login is required
            // console.log("When the user is not logged in but login is required")
            setUser(user)

            // console.log("setLoading(false)")
            setLoading(false)
    })

    const value = { language, setLanguage,user,loading };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}

export async function fetchUser(cookie = '') {
    if (typeof window !== 'undefined' && window.__user) {
        return window.__user
    }

    const res = await fetch(
        '/api/user',
        cookie
            ? {
                headers: {
                    cookie,
                },
            }
            : {}
    )

    if (!res.ok) {
        delete window.__user
        return null
    }

    const json = await res.json()
    if (typeof window !== 'undefined') {
        window.__user = json
    }
    return json
}