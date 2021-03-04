import Header from './header/header'
import {useFetchUser} from '../lib/user'
import React from 'react';
import {useRouter} from 'next/router'
import styles from './layout.module.css'
import {Container} from "react-bootstrap";

function Layout({children}) {
    const {user, loading} = useFetchUser()

    const route = useRouter().pathname

    return (
        <>
            <Header user={user} loading={loading} pathname={route}/>

    <Container>
            <main className={route==='/'?styles.main_home:styles.main}>
                {children}
            </main>
        </Container></>
    )
}

export default Layout
