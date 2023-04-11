const request = require('supertest')
const {afterAll, expect, it, beforeAll} = require('@jest/globals')

const db = require('../models/index')
const queryInterface = db.sequelize.getQueryInterface()
const app = require('../app')

const seedDocSched = require('../library/seedDoctorSchedule')
const seedPetshop = require('../library/seedPetshops')
const seedDoctor = require('../library/seedDoctor')
const { createToken } = require('../middlewares/jwt')
let access_token = createToken({UserId: 1})

beforeAll(async () => {
    await seedPetshop()
    await seedDoctor()
   

    
})

afterAll(async () => {
    // await queryInterface.bulkDelete('DoctorSchedules', {}, {truncate: true, restartIdentity: true, cascade:true})
    // await queryInterface.bulkDelete('Doctors', {}, {truncate: true, restartIdentity: true, cascade:true})
    // await queryInterface.bulkDelete('Petshops', {}, {truncate: true, restartIdentity: true, cascade:true})
    db.sequelize.close()
})


describe("POST /doctors/:PetshopId", () => {
    it('Sucess add Doctor', async () => {
        const response = await request(app)
        .post('/doctors/1')
        .send({
            name : 'Dr. Friday',
            gender: 'Female',
            education: "Universitas Terbuka",
            PetshopId: 1
        })
        .set('access_token', access_token)
        // console.log(access_token, "token>>>");

        console.log(response.body, ">>>>>doctor");

        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("gender")
        expect(response.body).toHaveProperty("education")
       
    })

    it("should send a response with 400 status code when there's no name", async () => {
        const response = await request(app)
        .post('/doctors/1')
        .send({
            // name : 'Dr. Friday',
            gender: 'Female',
            education: "Universitas Terbuka",
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

    
    it("should send a response with 400 status code when there's no gender", async () => {
        const response = await request(app)
        .post('/doctors/1')
        .send({
            name : 'Dr. Friday',
            // gender: 'Female',
            education: "Universitas Terbuka",
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

    
    it("should send a response with 400 status code when there's no education", async () => {
        const response = await request(app)
        .post('/doctors/1')
        .send({
            name : 'Dr. Friday',
            gender: 'Female',
            // education: "Universitas Terbuka",
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

   
})


describe('GET /doctors/:PetshopId', () => {
    it('success fetch all doctors by specific petshop', async () => {
        const response = await request(app)
        .get('/doctors/1')
        .set('access_token', access_token)

        // console.log(response.body, "response>>>>");
        expect(response.status).toEqual(200)
        expect(Array.isArray(response.body)).toEqual(true)
        expect(response.body[0]).toHaveProperty("name")
        expect(response.body[0]).toHaveProperty("gender")
        expect(response.body[0]).toHaveProperty("education")

    })

    it('failed fetch all doctors by specific id without login', async () => {
        const response = await request(app)
        .get('/doctors/1/1')
        // .set('access_token', access_token)

        // console.log(response.body, "response>>>>");
        const expectedRes = {
            message: response.body.message
        }
    
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toEqual(expectedRes)

    })

    it('Petshop Not exist', async () => {
        const response = await request(app)
        .get('/doctors/100000')
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

describe('GET /doctors/:PetshopId/:DoctorId', () => {
    it('success fetch all doctors by specific petshop', async () => {
        const response = await request(app)
        .get('/doctors/1/1')
        .set('access_token', access_token)

        // console.log(response.body, "response>>>>");
        expect(response.status).toEqual(200)
        expect(typeof response.body).toEqual('object')
        expect(response.body).toHaveProperty('name')
        expect(response.body).toHaveProperty('gender')
        expect(response.body).toHaveProperty('education')


    })

    it('failed fetch all doctors by specific id without login', async () => {
        const response = await request(app)
        .get('/doctors/1/1')
        // .set('access_token', access_token)

        // console.log(response.body, "response>>>>");
        const expectedRes = {
            message: response.body.message
        }
    
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toEqual(expectedRes)

    })

    it('Petshop Not exist', async () => {
        const response = await request(app)
        .get('/doctors/10000/1')
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


describe("PUT /doctors/:PetshopId/:DoctorId", () => {
    it('Sucess edit Doctor', async () => {
        const response = await request(app)
        .put('/doctors/1/1')
        .send({
            name : 'Dr. monday',
            gender: 'Female',
            education: "Universitas Tertutup",
            PetshopId: 1
        })
        .set('access_token', access_token)
        // console.log(access_token, "token>>>");

        // console.log(response.body, ">>>>>doctor");
        expect(response.status).toEqual(200)
        expect(typeof response.body).toEqual('object')

        const expectedRes = {
            message: response.body.message
        }
    

        expect(response.body).toHaveProperty('message')
        expect(response.body).toEqual(expectedRes)
       
    })

    it('Doctor Not exist', async () => {
        const response = await request(app)
        .put('/doctors/1/10000')
        .send({
            name : 'Dr. monday',
            gender: 'Female',
            education: "Universitas Tertutup",
            PetshopId: 1
        })
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


describe("DELETE /doctors/:PetshopId/:DoctorId", () => {
    it('Sucess delete doctor', async () => {
        const response = await request(app).delete('/doctors/1/1')
        .set('access_token', access_token)

        const expectedRes = {
            message: response.body.message
        }
    
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty("message")
         expect(response.body).toEqual(expectedRes)

    })

    it('Doctor Not exist', async () => {
        const response = await request(app).delete('/doctors/1/1000')
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
