// This import is only included in the server build, because it's only used by getServerSideProps
import auth0 from '../lib/auth0.js'
import Layout from '../components/layout.js'
import ProfileForm from '../components/profile/old/profileForm'

function Profile({ user }) {
    return (
        <Layout user={user}>
            <h1>Server Rendered Profile</h1>

            {!user && (
                <p>You must login to see your profile</p>
            )}
            {user && (
            <div>
                <h3>Profile (server rendered)</h3>
                <img src={user.picture} alt="user picture" />
                <p>nickname: {user.nickname}</p>
                <p>name: {user.name}</p>{user.first_name}
            </div>
            )}
        </Layout>
    )
}

export async function getServerSideProps({ req, res }) {
    // Here you can check authentication status directly before rendering the page,
    // however the page would be a serverless function, which is more expensive and
    // slower than a static page with client side authentication
    const session = await auth0.getSession(req)

    if (!session || !session.user) {
        res.writeHead(302, {
            Location: '/api/login',
        })
        res.end()
        return
    }

    return { props: { user: session.user } }
}

export default Profile
