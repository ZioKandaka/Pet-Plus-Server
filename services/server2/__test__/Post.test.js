const request = require('supertest')
const {afterAll, expect, it, beforeAll} = require('@jest/globals')

const db = require('../models/index')
const queryInterface = db.sequelize.getQueryInterface()
const app = require('../app')

const seedDocSched = require('../library/seedDoctorSchedule')
const seedPetshop = require('../library/seedPetshops')
const seedPost = require('../library/seedPost')
const { createToken } = require('../middlewares/jwt')
let access_token = createToken({UserId: 1})

beforeAll(async () => {
    await seedPetshop()
    await seedPost()
 
})

afterAll(async () => {
    // await queryInterface.bulkDelete('DoctorSchedules', {}, {truncate: true, restartIdentity: true, cascade:true})
    // await queryInterface.bulkDelete('Doctors', {}, {truncate: true, restartIdentity: true, cascade:true})
    // await queryInterface.bulkDelete('Petshops', {}, {truncate: true, restartIdentity: true, cascade:true})
    db.sequelize.close()
})



describe("POST /posts/:PetshopId", () => {
    it('Sucess add Doctor', async () => {
        const response = await request(app)
        .post('/posts/1')
        .send({
            title : 'Pet care with Dr. Friday',
            news: 'If you love your pet, register now!',
            PetshopId: 1
        })
        .set('access_token', access_token)
        // console.log(access_token, "token>>>");

        // console.log(response.body, ">>>>>doctor");

        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty("title")
        expect(response.body).toHaveProperty("news")
       
    })

    it("should send a response with 400 status code when there's no title", async () => {
        const response = await request(app)
        .post('/posts/1')
        .send({
            // title : 'Pet care with Dr. Friday',
            news: 'If you love your pet, register now!',
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

    
    it("should send a response with 400 status code when there's no news", async () => {
        const response = await request(app)
        .post('/posts/1')
        .send({
            title : 'Pet care with Dr. Friday',
            // news: 'If you love your pet, register now!',
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


describe('GET /posts/:PetshopId', () => {
    it('success fetch all post created by specific petshop', async () => {
        const response = await request(app)
        .get('/posts/1')
        .set('access_token', access_token)

        console.log(response.body, "response post>>>>");
        expect(response.status).toEqual(200)
        expect(Array.isArray(response.body)).toEqual(true)
        expect(response.body[0]).toHaveProperty("title")
        expect(response.body[0]).toHaveProperty("news")
        expect(response.body[0]).toHaveProperty("status")

    })

    it('Petshop Not exist', async () => {
        const response = await request(app)
        .get('/posts/100')
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


describe('GET /posts/:PetshopId/:PostId', () => {
    it('success fetch specific post created by specific petshop', async () => {
        const response = await request(app)
        .get('/posts/1/1')
        .set('access_token', access_token)

        // console.log(response.body, "response>>>>");
        expect(response.status).toEqual(200)
        expect(typeof response.body).toEqual('object')
        expect(response.body).toHaveProperty('title')
        expect(response.body).toHaveProperty('news')
        expect(response.body).toHaveProperty('status')

    })

    it('Petshop Not exist', async () => {
        const response = await request(app)
        .get('/posts/1/100000')
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


describe("PUT /posts/:PetshopId/:PostId", () => {
    it('Sucess add Doctor', async () => {
        const response = await request(app)
        .put('/posts/1/1')
        .send({
            title : 'Pet care with Dr. wednesday',
            news: 'If you love your pet, register now!',
            PetshopId: 1
        })
        .set('access_token', access_token)
        // console.log(access_token, "token>>>");

        expect(response.status).toEqual(200)
        expect(typeof response.body).toEqual('object')

        const expectedRes = {
            message: response.body.message
        }
    

        expect(response.body).toHaveProperty('message')
        expect(response.body).toEqual(expectedRes)
       
    })

    it('Post Not exist', async () => {
        const response = await request(app)
        .put('/posts/1/100000')
        .send({
            title : 'Pet care with Dr. wednesday',
            news: 'If you love your pet, register now!',
            PetshopId: 1
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

describe("DELETE /posts/:PetshopId/:PostId", () => {
    it('Sucess delete post by id', async () => {
        const response = await request(app).delete('/posts/1/1')
        .set('access_token', access_token)

        const expectedRes = {
            message: response.body.message
        }
    
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty("message")
         expect(response.body).toEqual(expectedRes)

    })

    it('Post Not exist', async () => {
        const response = await request(app).delete('/posts/1/1')
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