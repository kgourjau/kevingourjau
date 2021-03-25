import React, {createContext, useContext, useState, useEffect} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import Layout from '../components/layout.js'
import { applySession } from 'next-session';

const AppContext = createContext({});

export const options = { };

export function useAppContext() {
    return useContext(AppContext);
}

export function AppWrapper({children}){
    const [session, setSession] = useState({})

    const value = { user,loading,login,count,increment,logout };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}
export default function Page({views}) {
    return (
        <div>In this session, you have visited this website {views} time(s).</div>
    );
}

export async function getServerSideProps({ req, res }) {
    await applySession(req, res, options);
    req.session.views = req.session.views ? req.session.views + 1 : 1;
    return {
        props: {
            views: req.session.views
        }
    }
}