import CustomNavItemList from "../nav/customNavItemList.js";
import {NavDropdown} from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.css'
import styles from './header_home.module.css'
import React, {useEffect, useState} from "react"
import {animateScroll as scroll, Link as LinkScroll} from "react-scroll";
import {Image} from "react-bootstrap";
import Layout from "../layout_home.js";
import CustomNavLink from "../nav/customNavItem.js";
import {useAppContext} from "../../lib/user";

function Icon(){
    return (
        <i className="fas fa-user"></i>
    )
}

function navClassName(pos, pathname) {
    if (pos === "top") {
        return pathname === "/" ? styles.nav_top_home : styles.nav_top_other;
    } else {
        return pathname === "/" ? styles.nav_bottom_home : styles.nav_bottom_other;
    }
}

function CustomNav({user, loading, pathname}) {
    const {user,loading,login,count, increment, logout } = useAppContext()

    const [pos, setPos] = useState("top")
    useEffect(() => {
        document.addEventListener("scroll", e => {
            let scrolled = document.scrollingElement.scrollTop;
            if (scrolled >= 5) {
                setPos("moved")
            } else {
                setPos("top")
            }
        })
    }, [])

    console.log(pathname);

    let nav_classname = styles.nav_custom+" "+ navClassName(pos, pathname);

    const links = [
        {href: "/tic-tac-toe", name: "Tic Tac Toe"}
    ]

    return (
        <nav className={'navbar navbar-expand-lg fixed-top ' + nav_classname}>
            <ul className={"navbar-nav me-auto mb-2 mb-lg-0 "+styles.left_item}>
                <CustomNavItemList navItems={[{href: "/", name: "Home"}]}/>

                <li className="nav-item">
                    <LinkScroll
                        href="#services"
                        to="services"
                        activeClass={styles.link_active}
                        className="nav-link"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        Services
                    </LinkScroll>
                </li>
                <li className="nav-item">
                    <LinkScroll
                        href="#team"
                        to="team"
                        activeClass={styles.link_active}
                        className="nav-link"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        Team
                    </LinkScroll>
                </li>



            </ul>
            <ul className={"navbar-nav me-auto"}>
                <CustomNavLink name={"Users"} href={"/users"}/>
                <CustomNavLink name={"Tic-Tac-Toe"} href={"/tic-tac-toe"}/>
                <NavDropdown className={styles.drop_down} title="APIs" id="basic-nav-dropdown">
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
        </nav>)
}

function Header({user, loading, pathname}) {
    return (
        <header>
            <CustomNav user={user} loading={loading} pathname={pathname}></CustomNav>
            <div
                style={{height: 40 + 'em', position: 'relative', overflow: 'hidden', 'maxWidth': '100%', 'width': '100%'}}>
                <Image src="./assets/img/background/waves-5635959_1920.jpg"
                       style={{width: 100 + '%', 'objectFit': 'contain'}}/>
            </div>
        </header>
    )
}

export default Header
