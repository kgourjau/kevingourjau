import {Container} from "react-bootstrap";
import { useFetchUser } from '../lib/user.js'
import {useAppContext} from "../lib/user.js"
import {useContext} from "react";
// import {useAppContext} from '../lib/AppContext'

function ProfileCard({ user }) {
    return (
        <>
            <h1>Profile</h1>

            <div>
                <h3>Profile (client rendered)</h3>
                <p>nickname: {user.given_name}</p>
                <p>name: {user.family_name}</p>
            </div>
        </>
    )
}

function logout(){
    window.open("/api/logout", "Logout", "height=600,width=400")
}

function Demo(){
    const {user,loading,login,count, increment } = useAppContext()

    // console.log("user")
    // console.log(user)
    // console.log("loading")
    // console.log(loading)
    // console.log("increment")
    // console.log(increment)

    return (
        <Container>
            <h1>Client Rendered Profile</h1>
            {loading ? <>Loading...</> : (user? <ProfileCard user={user} />:"Not logged")}
            <button onClick={login}>Login</button>
            <button onClick={()=>logout()}>Logout</button>
            <button onClick={increment}>price: {count}</button>

        </Container>
    )
}

export default Demo