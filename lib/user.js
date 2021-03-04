import { createContext, useContext,useState, useEffect } from 'react'
import React from "react";
import auth0 from "auth0-js";


export function AppWrapper({ children }) {
    const [count, updateCount] = useState(0)
    const [loading, setLoading] = useState(
        () => !(typeof window !== 'undefined' && window.__user)
    )
    const [user, setUser] = useState(() => {
        if (typeof window === 'undefined') {
            return null
        }

        return window.__user || null
    })
    const [popupLogout,setPopupLogout] = useState(null)

    function increment() {
        updateCount(count + 1)
    }
    function addListener(inOrOut){
        window.addEventListener('message', (event) => {
            if(event.data === "logout successful"){
                if(inOrOut){
                    fetchUser().then((user) => {
                        setUser(user)
                        setLoading(false)
                    })
                }
                else{
                    console.log("Log out")
                    window.__user = null
                    setUser(null)
                }
            }
        });
    }
    function login(){
        addListener(true)
        const url = "/api/login"
        let my_popup = ""
        setPopupLogout(window.open(url, "Login", "height=600,width=400"))
    }
    function logout(){
        addListener(false)
        const url = "/api/logout"
        let my_popup = ""
        setPopupLogout(window.open(url, "Logout", "height=600,width=400"))
    }

    useEffect(
        () => {
            console.log("Lib useEffect()")
            if (!loading && user) {
                console.log("lib/user.!loading && user")
                return
            }
            // console.log("setLoading(true)")
            setLoading(true)
            let isMounted = true

            fetchUser().then((user) => {
                // Only set the user if the component is still mounted
                if (isMounted) {
                    // When the user is not logged in but login is required
                    console.log("lib/user.When the user is not logged in but login is required")
                    setUser(user)

                    console.log("lib/user.setLoading(false)")
                    setLoading(false)


                    console.log("lib/user.{user}")
                    console.log({user})
                }
            })

            return () => {
                isMounted = false
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [user]
    )

    const value = { user,loading,login,count,increment,logout };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

const AppContext = createContext({});

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

    const user = Object.keys(json).length===0?null:json

    console.log("fetch/json")
    console.log(json)
    console.log("fetch/user")
    console.log(user)
    if (typeof window !== 'undefined') {
        console.log("window.__user = user")
        window.__user = user
    }
    return user
}

export function useFetchUser({ required } = {}) {
    const [loading, setLoading] = useState(
        () => !(typeof window !== 'undefined' && window.__user)
    )
    const [user, setUser] = useState(() => {
        if (typeof window === 'undefined') {
            return null
        }

        return window.__user || null
    })

    useEffect(
        () => {
            if (!loading && user) {
                return
            }
            setLoading(true)
            let isMounted = true

            fetchUser().then((user) => {
                // Only set the user if the component is still mounted
                if (isMounted) {
                    // When the user is not logged in but login is required
                    setUser(user)
                    setLoading(false)
                }
            })

            return () => {
                isMounted = false
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    return { user, loading }
}
