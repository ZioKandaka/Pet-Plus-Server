const request = require("supertest");
const { afterAll, expect, it, beforeAll } = require("@jest/globals");

const db = require("../models/index");
const queryInterface = db.sequelize.getQueryInterface();
const app = require("../app");

const seedDocSched = require("../library/seedDoctorSchedule");
const seedPetshop = require("../library/seedPetshops");

const { createToken } = require("../middlewares/jwt");
const seedDoctor = require("../library/seedDoctor");
let access_token = createToken({ UserId: 1 });

beforeAll(async () => {
  await seedPetshop();
  await seedDoctor();
  // await seedDocSched()
});

afterAll(async () => {
  try {
    // await queryInterface.bulkDelete(
    //   "DoctorSchedules",
    //   {},
    //   { truncate: true, restartIdentity: true, cascade: true }
    // );
    // await queryInterface.bulkDelete(
    //   "Doctors",
    //   {},
    //   { truncate: true, restartIdentity: true, cascade: true }
    // );
    // await queryInterface.bulkDelete(
    //   "Petshops",
    //   {},
    //   { truncate: true, restartIdentity: true, cascade: true }
    // );

    db.sequelize.close();
  } catch (error) {
    console.log(error, ">>>>>>>>>");
  }
});

describe("POST /petSchedule/public/:PetId", () => {
  it("Sucess add pet schedule", async () => {

      const response = await request(app).post("/petSchedule/public/1").send({
        details: "sick cat",
        PetId: 1,
        DoctorScheduleId: 1,
        PetshopId: 1,
      })
      .set('access_token', access_token)
      // console.log(access_token, "token>>>");

      expect(response.status).toEqual(201);
      expect(response.body).toHaveProperty("details");
      expect(response.body).toHaveProperty("PetId");
      expect(response.body).toHaveProperty("DoctorScheduleId");
      expect(response.body).toHaveProperty("PetshopId");
  });

  it("should send a response with 400 status code when there's no details", async () => {
      const response = await request(app)
      .post('/petSchedule/public/1')
      .send({
          // details : 'sick cat',
          PetId: 1,
          DoctorScheduleId: 1,
          PetshopId: 1
      })
      .set('access_token', access_token)
      // console.log(access_token, "token>>>");

      // console.log(response.body, ">>>>>doctor");

      const expectedRes = {
          message: response.body.message
      }

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('message')
      expect(response.body).toEqual(expectedRes)

  })


});


describe('GET /petSchedule/public/:PetId', () => {
    it('success fetch all pets by user Id', async () => {
        const response = await request(app)
        .get('/petSchedule/public/1')
        .set('access_token', access_token)

        // console.log(response.body, "response>>>>");
        expect(response.status).toEqual(200)
        expect(Array.isArray(response.body)).toEqual(true)
        expect(response.body[0]).toHaveProperty("details")
        expect(response.body[0]).toHaveProperty("complete")

    })

   
})


describe('GET /petSchedule/:PetshopId', () => {
    it('success fetch all pets by user Id', async () => {
        const response = await request(app)
        .get('/petSchedule/1')
        .set('access_token', access_token)

        // console.log(response.body, "response>>>>");
        expect(response.status).toEqual(200)
        expect(Array.isArray(response.body)).toEqual(true)
        expect(response.body[0]).toHaveProperty("details")
        expect(response.body[0]).toHaveProperty("complete")

    })

    it('Petshop Not exist', async () => {
        const response = await request(app)
        .get('/petSchedule/1000')
        .set('access_token', access_token)

        // console.log(response.body, "response>>>>");
        const expectedRes = {
            message: response.body.message
        }
  
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toEqual(expectedRes)
  

    })

   
})

