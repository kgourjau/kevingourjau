const HOST = () => {
    if (typeof(process.env.VERCEL_URL) !== "undefined") return process.env.VERCEL_URL
    if (typeof(process.env.HOST) !== "undefined") return process.env.HOST
    return "http://localhost:3000"
}
export default HOST()