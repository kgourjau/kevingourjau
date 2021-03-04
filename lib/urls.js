const HOST = () => {
    if (typeof(process.env.NEXT_VERCEL_URL) !== "undefined") return process.env.NEXT_VERCEL_URL
    if (typeof(process.env.NEXT_PUBLIC_HOST) !== "undefined") return process.env.NEXT_PUBLIC_HOST
    return "http://localhost:3000"
}
export default HOST()