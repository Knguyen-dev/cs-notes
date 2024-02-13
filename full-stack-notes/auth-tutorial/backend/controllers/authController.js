const User = require("../model/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Simple login, it returns roles and access token, but also puts the refresh token in the cookies
const handleLogin = async (req, res) => {
    const { user, pwd } = req.body
    if (!user || !pwd)
        return res
            .status(400)
            .json({ message: "Username and password are required." })

    const foundUser = await User.findOne({ username: user }).exec()
    if (!foundUser) return res.sendStatus(401) //Unauthorized
    // evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password)
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean)
        // create JWTs
        const accessToken = jwt.sign(
            {
                UserInfo: {
                    username: foundUser.username,
                    roles: roles,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10s" }
        )
        const refreshToken = jwt.sign(
            { username: foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        )
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken
        const result = await foundUser.save()

        // Creates Secure Cookie with refresh token
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000,
        })

        // Send authorization roles and access token to user
        // So the important thing is actually sending back the roles so that we can do
        // client side route protection
        res.json({ roles, accessToken })
    } else {
        res.sendStatus(401)
    }
}

module.exports = { handleLogin }
