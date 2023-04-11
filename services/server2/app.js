if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { sequelize, Sequelize } = require("./models");
const { Petshop } = require("./models");
const ImageCloud = require("./helpers/imageKit");
const upload = require("./helpers/multer");
const Controller = require("./controllers/controller");
const authentication = require("./middlewares/authentication");
const errorHandler = require("./middlewares/errorHandler");


// app.use(authentication)
// app.use(authentication)

// pet shops
app.post("/petShop/register", upload.single("logo"), Controller.petshopRegister)
app.get("/petShops", Controller.getAllPetShops)
app.get("/petShops/around", Controller.shopAroundMe);
app.get("/petShop/:UserId", Controller.getPetShopById)
app.put("/petShop/:PetshopId", upload.single("logo"), Controller.petShopEdit)

// medical records & action
app.get("/medicalRecord/:PetId", Controller.getRecord)
app.post("/medicalRecord", Controller.postRecord)
app.post("/action/:MedicalRecordId", upload.single("document"), Controller.postAction)

app.post("/xendit", Controller.paymentXendit)

// Doctor Schedule
app.get("/doctorSchedule/:DoctorId/:PetshopId", Controller.getDocSched)
app.post("/doctorSchedule/:DoctorId/:PetshopId", Controller.postDocSched)
app.put("/doctorSchedule/:DoctorScheduleId", Controller.putDocSched)
app.delete("/doctorSchedule/:DoctorScheduleId", Controller.deleteDocSched)


//doctors

app.post("/doctors/:PetshopId", upload.single("imgUrl"), Controller.registerDoctor)
app.get("/doctors/:PetshopId", Controller.fetchAllDoctor)
app.get("/doctors/:PetshopId/:DoctorId",  Controller.fetchDoctor)
app.put("/doctors/:PetshopId/:DoctorId", upload.single("imgUrl"), Controller.putDoctor)
app.delete("/doctors/:PetshopId/:DoctorId",  Controller.deleteDoctor)


// POST
app.post("/posts/:PetshopId", upload.single("imageUrl"), Controller.createPost)
app.get("/posts/:PetshopId", Controller.fetchAllPost)
app.get("/posts/:PetshopId/:PostId", Controller.fetchPost)
app.put("/posts/:PetshopId/:PostId", upload.single("imageUrl"), Controller.putPost)
app.delete("/posts/:PetshopId/:PostId",  Controller.deletePost)

// SERVICE
app.post("/service/:PetshopId", upload.single("serviceLogo"), Controller.addService)
app.get("/service/:PetshopId", Controller.fetchAllService)
app.put("/service/:PetshopId/:ServiceId", upload.single("serviceLogo"), Controller.putService)
app.delete("/service/:PetshopId/:ServiceId",  Controller.deleteService)



// PET SCHEDULE
app.post("/petSchedule/public/:PetId", Controller.createPetSchedule)
app.get("/petSchedule/public/:PetId", Controller.fetchAllSchedule)
app.get("/petSchedule/:PetshopId", Controller.fetchScheduleForPetshop)





app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// module.exports = app