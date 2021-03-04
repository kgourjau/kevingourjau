import Layout from '../components/layout.js'
import ProfileData from '../components/profile/profile.js'
import { useFetchUser } from '../lib/user.js'
import auth0 from "../lib/auth0";
const Profile = () => {


    const {user,loading} = useFetchUser()

    return (
        <Layout>
            <h1>Profile</h1>
            <ProfileData user={user} loading={loading}/>
        </Layout>
    )
}

export default Profile
