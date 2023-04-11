const request = require('supertest')
const {afterAll, expect, it, beforeAll} = require('@jest/globals')

const db = require('../models/index')
const queryInterface = db.sequelize.getQueryInterface()
const app = require('../app')


const seedPetshop = require('../library/seedPetshops')
const seedService = require('../library/seedService')

const { createToken } = require('../middlewares/jwt')
let access_token = createToken({UserId: 1})

beforeAll(async () => {
    await seedPetshop()
    await seedService()
 
})

afterAll(async () => {
    // await queryInterface.bulkDelete('DoctorSchedules', {}, {truncate: true, restartIdentity: true, cascade:true})
    // await queryInterface.bulkDelete('Doctors', {}, {truncate: true, restartIdentity: true, cascade:true})
    // await queryInterface.bulkDelete('Petshops', {}, {truncate: true, restartIdentity: true, cascade:true})
    db.sequelize.close()
})



describe("POST /service/:PetshopId", () => {
    it('Sucess add Service', async () => {
        const response = await request(app)
        .post('/service/1')
        .send({
            name : 'swimmingg',
            minPrice: 10000,
            maxPrice: 1000000,
            PetshopId : 1
        })
        .set('access_token', access_token)
        // console.log(access_token, "token>>>");

        // console.log(response.body, ">>>>>doctor");

        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("minPrice")
        expect(response.body).toHaveProperty("maxPrice")

       
    })

    it("should send a response with 400 status code when there's no name", async () => {
        const response = await request(app)
        .post('/service/1')
        .send({
            // name : 'swimmingg',
            minPrice: 10000,
            maxPrice: 1000000,
            PetshopId : 1
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

    
    it("should send a response with 400 status code when there's no min price", async () => {
        const response = await request(app)
        .post('/service/1')
        .send({
            name : 'swimmingg',
            // minPrice: 10000,
            maxPrice: 1000000,
            PetshopId : 1
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


    it("should send a response with 400 status code when there's no max price", async () => {
        const response = await request(app)
        .post('/service/1')
        .send({
            name : 'swimmingg',
            minPrice: 10000,
            // maxPrice: 1000000,
            PetshopId : 1
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


describe('GET /service/:PetshopId', () => {
    it('success fetch all post created by specific petshop', async () => {
        const response = await request(app)
        .get('/service/1')
        .set('access_token', access_token)

        // console.log(response.body, "response>>>>");
        expect(response.status).toEqual(200)
        expect(Array.isArray(response.body)).toEqual(true)
        expect(response.body[0]).toHaveProperty("name")
        expect(response.body[0]).toHaveProperty("minPrice")
        expect(response.body[0]).toHaveProperty("maxPrice")

    })

    it('Petshop not exist', async () => {
        const response = await request(app)
        .get('/service/100000')
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


describe("PUT /service/:PetshopId/:ServiceId", () => {
    it('Sucesss edit Service', async () => {
        const response = await request(app)
        .put('/service/1/1')
        .send({
            name : 'swimmingg LESSON',
            minPrice: 10000,
            maxPrice: 1000000,
            PetshopId : 1
        })
        .set('access_token', access_token)
        // console.log(access_token, "token>>>");

        // console.log(response.body, ">>>>>doctor");

        const expectedRes = {
            message: response.body.message
        }
    
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty("message")
         expect(response.body).toEqual(expectedRes)

       
    })

    it('service Not exist', async () => {
        const response = await request(app)
        .put('/service/1/100000')
        .send({
            name : 'swimmingg LESSON',
            minPrice: 10000,
            maxPrice: 1000000,
            PetshopId : 1
        })
        .set('access_token', access_token)
        // console.log(access_token, "token>>>");

        // console.log(response.body, "response>>>>");
        const expectedRes = {
            message: response.body.message
        }
  
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toEqual(expectedRes)
  

    })




})


describe("DELETE  /service/:PetshopId/:ServiceId", () => {
    it('Sucess delete service', async () => {
        const response = await request(app).delete('/service/1/1')
        .set('access_token', access_token)

        const expectedRes = {
            message: response.body.message
        }
    
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty("message")
         expect(response.body).toEqual(expectedRes)

    })


    it('service Not exist', async () => {
        const response = await request(app).delete('/service/1/1')
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