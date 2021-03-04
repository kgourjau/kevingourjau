// This import is only needed when checking authentication status directly from getInitialProps
// import auth0 from '../lib/auth0.js'
import { useFetchUser } from '../lib/user.old.js'
import Layout from '../components/layout.js'

function ProfileCard({ user }) {
  return (
    <>
      <h1>Profile</h1>

      <div>
        <h3>Profile (client rendered)</h3>
        <img src={user.picture} alt="user picture" />
        <p>nickname: {user.nickname}</p>
        <p>name: {user.name}</p>
      </div>
    </>
  )
}

function CrProfile() {
  const { user, loading } = useFetchUser({ required: true })

  return (
    <Layout user={user} loading={loading}>
        <h1>Client Rendered Profile</h1>
      {loading ? <>Loading...</> : <ProfileCard user={user} />}
    </Layout>
  )
}

export default CrProfile
