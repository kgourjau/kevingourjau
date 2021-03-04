const HOST = () => {
    if (typeof(process.env.VERCEL_URL) !== "undefined") return process.env.VERCEL_URL
    if (typeof(process.env.HOST) !== "undefined") return process.env.HOST
    return process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID
}
export default HOST()