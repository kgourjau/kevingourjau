function GetAbsoluteURL(path){
    if (typeof(process.env.VERCEL_URL) !== "undefined") return process.env.VERCEL_URL + path
    if (typeof(process.env.HOST) !== "undefined") return process.env.HOST + path
    return "http://localhost:3000" + path

}

export default GetAbsoluteURL