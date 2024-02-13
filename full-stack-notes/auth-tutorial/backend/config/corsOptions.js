const allowedOrigins = require("./allowedOrigins")

/*
- Checks the origin everytime a request is made. Only allows 
  origins from allowedOrigins


*/
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    optionsSuccessStatus: 200,
}

module.exports = corsOptions
