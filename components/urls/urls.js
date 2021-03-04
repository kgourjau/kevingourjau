const { VERCEL_URL, HOST } = process.env

function GetAbsoluteURL(path){
    if (typeof(VERCEL_URL) !== "undefined") return VERCEL_URL + path
    if (typeof(HOST) !== "undefined") return HOST + path
    return "http://localhost:3000" + path

}

export default GetAbsoluteURL