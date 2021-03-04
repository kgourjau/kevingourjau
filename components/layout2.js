import React from 'react';
import {Container} from "react-bootstrap";

function Layout({children}) {
    return (
        <>
            <Container>
                <main>
                    {children}
                </main>
            </Container>
        </>
    )
}

export default Layout