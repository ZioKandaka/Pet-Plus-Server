if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require('express')
const app = express()
const cors = require("cors");
const port = process.env.PORT || 4001
const Controller = require('./controllers/controller');
const errorHandler = require("./middlewares/errorHandler");
const authentication = require("./middlewares/authentication")
const upload = require("./helpers/multer");



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/register", upload.single("imgUrl"), Controller.register)
app.post("/login", Controller.login)

// app.use(authentication)
// app.use(authentication)
app.get("/user/:UserId", Controller.getUserById)
app.put("/user/:UserId", upload.single("imgUrl"), Controller.putUser)
app.post("/pets/:UserId", upload.single("imgUrl"), Controller.addPet)
app.get("/pets/:UserId", Controller.fetchAllPet)
app.get("/pet/:id", Controller.fetchPet)
app.put("/pets/:UserId/:id", upload.single("imgUrl"), Controller.putPet)
app.delete("/pets/:UserId/:id", Controller.deletePet)

app.use(errorHandler)




// module.exports = app

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})