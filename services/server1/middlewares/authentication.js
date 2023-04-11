const express = require("express")
const app = express()
const { User } = require("../models/index")
const {createToken, decodeToken} = require('../middlewares/jwt')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


async function authentication(req, res, next) {
    try {
        let access_token = req.headers.access_token
        if (!access_token) {
          throw { name: "InvalidToken" }
        }

        let decoded = decodeToken(access_token)
        // console.log(decoded, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<');

        const user = await User.findByPk(decoded.UserId)
        // console.log(user, ">>>user");
        if (!user) {
          throw { name: "InvalidToken" }
        }
        req.user = {
          UserId: user.id,
          email: user.email,
          role: user.role
        }
        // console.log("LOLOS AUTHEN")
        next()
      } catch (err) {
        console.log(err)
        next(err)
      }
}


module.exports = authentication