import {Container} from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import {useAppContext} from "../../../lib/user"

function ProfileCard({ user }) {
    return (
        <>
            <h1>Profile</h1>

            <div>
                <h3>Profile (client rendered)</h3>
                <p>nickname: {user?user.given_name:""}</p>
                <p>name: {user?user.family_name:""}</p>
            </div>
        </>
    )
}

function LoginContainer({children}){
    return(
        <Container>
            {children}
        </Container>
    )
}
function Demo(){
    const {user,loading,login,count, increment, logout } = useAppContext()

    return (
        <LoginContainer>
            <p>{loading?"Loading...":"Loaded"}</p>
            <button onClick={login}>Login</button>
            <button onClick={logout}>Logout</button>
            <button onClick={increment}>price: {count}</button>
            <ProfileCard user={user} />
        </LoginContainer>
    )
}

export default Demo