import CustomNavItemList from "./customNavItemList";
import NavDropdown from "react-bootstrap/navDropdown";

import 'bootstrap/dist/css/bootstrap.css'
import styles from './header.module.css'
import {useEffect, useState} from "react"
import {animateScroll as scroll, Link as LinkScroll} from "react-scroll";

function navClassName(pos, pathname) {
    if (pos === "top") {
        return pathname === "/" ? styles.nav_top_home : styles.nav_top_other;
    } else {
        return pathname === "/" ? styles.nav_bottom_home : styles.nav_bottom_other;
    }
}

function CustomNav({user, loading, pathname}) {
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

    let nav_classname = navClassName(pos, pathname);

    const links = [
        {href: "/", name: "Home"},
        {href: "/demo", name: "Demo"},
        {href: "/about", name: "About"},
        {href: "/ext/nasa", name: "Nasa"},
        {href: "/tic-tac-toe", name: "Tic Tac Toe"}
    ]
    const links2 = [
        {href: "/profile", name: "Client-rendered profile"},
        {href: "/ssr-profile", name: "Server rendered profile (advanced)"},
        {href: "/api/logout", name: "Logout"}
    ]
    const links3 = [
        {href: "/api/login", name: "Login"}
    ]


    return (
        <nav className={'navbar navbar-expand-lg fixed-top nav_custom ' + nav_classname}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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

                <CustomNavItemList navItems={links}/>

                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>


                {!loading &&
                (user ? (
                    <>
                        <CustomNavItemList navItems={links2}/>
                    </>
                ) : (
                    <>
                        <CustomNavItemList navItems={links3}/>
                    </>
                ))}
            </ul>
        </nav>)
}

function Header({user, loading, pathname}) {
    return (
        <header>
            <CustomNav user={user} loading={loading} pathname={pathname}></CustomNav>
        </header>
    )
}

export default Header
