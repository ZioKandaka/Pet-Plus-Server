const express = require("express")
const app = express()
const { User } = require("../models/index")
const {createToken, decodeToken} = require('../middlewares/jwt')
const axios = require('axios')
const SERVER_ONE = process.env.SERVER_ONE || "http://localhost:4001";
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


async function authentication(req, res, next) {
    try {
      
        let access_token = req.headers.access_token
        console.log(access_token,"???");
        if (!access_token) {
          throw { name: "InvalidToken" }
        }


        let decoded = decodeToken(access_token)
        console.log(decoded, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<');

        let { data : user } = await axios({
          method: "GET",
          url: SERVER_ONE + "/user/" + Number(decoded.UserId),
          headers: {access_token: access_token}
        });
        console.log(user, "user exist>>>");

        // const user = await User.findByPk(decoded.UserId)
        if (!user) {
          throw { name: "InvalidToken" }
        }
        req.user = {
          UserId: user.id,
          email: user.email,
          role: user.role
        }
        // console.log(req.user);
        // console.log("LOLOS AUTHEN")
        next()
      } catch (err) {
        console.log(err)
        next(err)
      }
}


module.exports = authentication