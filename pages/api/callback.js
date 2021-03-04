import auth0 from '../../lib/auth0'
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, { redirectTo: '/callback' })
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}
