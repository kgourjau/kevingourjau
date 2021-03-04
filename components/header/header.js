import CustomNavItemList from "../nav/customNavItemList";
import CustomNavLink from "../nav/customNavItem"
import NavDropdown from "react-bootstrap/navDropdown";

import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.css'
import styles from './header.module.css'
import React, {useEffect, useState} from "react"
import {useAppContext} from "../../lib/user"
import ReactDOM from 'react-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserMinus } from '@fortawesome/free-solid-svg-icons'

function Icon(){
    return (
        <i className="fas fa-user"></i>
    )
}
function CustomNav() {
    const {user,loading,login,count, increment, logout } = useAppContext()

    const [pos, setPos] = useState("top")


    let nav_classname = ""

    const links = [
        {href: "/", name: "Home"},
        {href: "/tic-tac-toe", name: "Tic Tac Toe"}
    ]

    return (
        <nav className={'navbar navbar-expand-lg fixed-top ' + styles.nav_custom }>
            <ul className={"navbar-nav me-auto mb-2 mb-lg-0 "+styles.left_item}>
                <CustomNavLink name={"Home"} href={"/"}/>
            </ul>
            <ul className={"navbar-nav me-auto"}>
                <CustomNavLink name={"Users"} href={"/users"}/>
                <CustomNavLink name={"Tic-Tac-Toe"} href={"/tic-tac-toe"}/>
                <NavDropdown title="APIs" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/ext/nasa">Nasa</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    {!loading && user?<>
                            <NavDropdown.Item href="/cr-profile">Auth0 Client Rendered Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/ssr-profile">Auth0 Server Rendered Profile</NavDropdown.Item></>:
                        <NavDropdown.Item href="/api/login">Log in to see auth0 profiles pages</NavDropdown.Item>
                    }
                </NavDropdown>
            </ul>
            <ul className={"navbar-nav ml-auto"}>
                <CustomNavLink name={user?user.given_name:""} href={"#"}/>

                {(!loading && user)?
                    <></>:
                    <></>
                }

                <NavDropdown title={<Icon/>} id="basic-nav-dropdown">
                    {user?
                        <NavDropdown.Item href="#" onClick={logout}>Logout</NavDropdown.Item>:
                        <NavDropdown.Item href="#" onClick={login}>Login</NavDropdown.Item>
                    }
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>

                </NavDropdown>
            </ul>
        </nav>
    )
}

function Header({user, loading, pathname}) {
    return (
        <header>
            <CustomNav user={user} loading={loading} pathname={pathname}></CustomNav>
        </header>
    )
}

export default Header
