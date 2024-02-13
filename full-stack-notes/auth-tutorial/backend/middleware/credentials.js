const allowedOrigins = require("../config/allowedOrigins")

/*
- Enables CORS credential support based on certain origins. So for the origins we
  defined, it will allow the sharing of things such as cookies, allowing us to set cookies in return.
*/
const credentials = (req, res, next) => {
    const origin = req.headers.origin
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Credentials", true)
    }
    next()
}

module.exports = credentials
