const User = require("../model/User")
const jwt = require("jsonwebtoken")

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies

    // If a cookie named 'jwt' doesn't exist, return a 401
    if (!cookies?.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt

    // Find the user in the database associated with said refresh token
    const foundUser = await User.findOne({ refreshToken }).exec()

    // If no user, the refresh token was probably revoked already
    if (!foundUser) return res.sendStatus(403) //Forbidden

    // evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            const roles = Object.values(foundUser.roles)

            // Create the access token with the user's info such as username and the roles they have
            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        username: decoded.username,
                        roles: roles,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "10s" }
            )
            // Return roles and access token
            res.json({ roles, accessToken })
        }
    )
}

module.exports = { handleRefreshToken }
