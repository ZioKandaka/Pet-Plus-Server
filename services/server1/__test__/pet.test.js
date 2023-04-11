const request = require('supertest')
// const {afterAll, expect, it, beforeAll} = require('@jest/globals')

const db = require('../models/index')
const {User} = require('../models')
const queryInterface = db.sequelize.getQueryInterface()
const app = require('../app')
const { createToken } = require("../middlewares/jwt");
const bulkInsertPet = require('../library/seedPet')


let access_token=  createToken({UserId: 1})

beforeAll(async () => {

        await bulkInsertPet()

    // const user = await User.create({
    //     username : "jiso",
    //     fullName: "jisoo",
    //     email : "jiso@mail.com",
    //     password : "12345",
    //     phoneNumber : "21712", 
    //     address : "Jakarta",
    //     role : "Owner"
    // })

    // console.log(user.dataValues.id, "ini user>>>>>>>>>");

   
    // console.log(access_token,">>>>>>");
    
})

afterAll(async () => {
    db.sequelize.close()
})


describe('POST /pets/1', () => {
    it('success add pet', async () => {
        const response = await request(app)
        .post('/pets/1')
        .send({
            name: 'Bobo 222',
            imgUrl: "bobooo",
            gender: 'Female',
            species : 'Cat', 
            breed : 'Himalayan',
            description : 'white cat' ,
            weight: "2 kg",
            UserId: 1
        })
        .set('access_token', access_token)

        console.log(response.body, "response>>>>");
        expect(response.status).toEqual(201)
        expect(typeof response.body).toEqual('object')

       
        expect(response.body).toHaveProperty('name')
        expect(response.body).toHaveProperty('imgUrl')
        expect(response.body).toHaveProperty('gender')
        expect(response.body).toHaveProperty('species')
        expect(response.body).toHaveProperty('breed')
        expect(response.body).toHaveProperty('description')
        expect(response.body).toHaveProperty('weight')
        expect(response.body).toHaveProperty('UserId')

        expect(typeof response.body.name).toEqual('string')
        expect(typeof response.body.imgUrl).toEqual('object')
        expect(typeof response.body.gender).toEqual('string')
        expect(typeof response.body.species).toEqual('string')
        expect(typeof response.body.breed).toEqual('string')
        expect(typeof response.body.description).toEqual('string')
        expect(typeof response.body.weight).toEqual('string')
        expect(typeof response.body.UserId).toEqual('number')

    })

    it("should send a response with 400 status code when there's no name", async () => {
        const response = await request(app)
        .post('/pets/1')
        .send({
            // name: 'Bobo',
            imgUrl: "bobooo",
            gender: 'Female',
            species : 'Cat', 
            breed : 'Himalayan',
            description : 'white cat' ,
            weight: "2 kg",
            UserId: 1
        })
        .set('access_token', access_token)

        console.log(response.body, "response>>>>");
        

        const expectedRes = {
            message: response.body.message
        }
    
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toEqual(expectedRes)

    })

    it("should send a response with 400 status code when there's no gender", async () => {
        const response = await request(app)
        .post('/pets/1')
        .send({
            name: 'Bobo',
            imgUrl: "bobooo",
            // gender: 'Female',
            species : 'Cat', 
            breed : 'Himalayan',
            description : 'white cat' ,
            weight: "2 kg",
            UserId: 1
        })
        .set('access_token', access_token)

        // console.log(response.body, "response>>>>");
        

        const expectedRes = {
            message: response.body.message
        }
    
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toEqual(expectedRes)

    })

    it("should send a response with 400 status code when there's no species", async () => {
        const response = await request(app)
        .post('/pets/1')
        .send({
            name: 'Bobo',
            imgUrl: "bobooo",
            gender: 'Female',
            // species : 'Cat', 
            breed : 'Himalayan',
            description : 'white cat' ,
            weight: "2 kg",
            UserId: 1
        })
        .set('access_token', access_token)

        // console.log(response.body, "response>>>>");
        

        const expectedRes = {
            message: response.body.message
        }
    
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toEqual(expectedRes)

    })

    it("should send a response with 400 status code when there's no breed", async () => {
        const response = await request(app)
        .post('/pets/1')
        .send({
            name: 'Bobo',
            imgUrl: "bobooo",
            gender: 'Female',
            species : 'Cat', 
            // breed : 'Himalayan',
            description : 'white cat' ,
            weight: "2 kg",
            UserId: 1
        })
        .set('access_token', access_token)

        // console.log(response.body, "response>>>>");
        

        const expectedRes = {
            message: response.body.message
        }
    
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toEqual(expectedRes)

    })


    it("should send a response with 400 status code when there's no description", async () => {
        const response = await request(app)
        .post('/pets/1')
        .send({
            // name: 'Bobo',
            imgUrl: "bobooo",
            gender: 'Female',
            species : 'Cat', 
            breed : 'Himalayan',
            // description : 'white cat' ,
            weight: "2 kg",
            UserId: 1
        })
        .set('access_token', access_token)

        // console.log(response.body, "response>>>>");
        

        const expectedRes = {
            message: response.body.message
        }
    
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toEqual(expectedRes)

    })

    it("should send a response with 400 status code when there's no weight", async () => {
        const response = await request(app)
        .post('/pets/1')
        .send({
            name: 'Bobo',
            imgUrl: "bobooo",
            gender: 'Female',
            species : 'Cat', 
            breed : 'Himalayan',
            description : 'white cat' ,
            // weight: "2 kg",
            UserId: 1
        })
        .set('access_token', access_token)

        // console.log(response.body, "response>>>>");
        

        const expectedRes = {
            message: response.body.message
        }
    
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toEqual(expectedRes)

    })

})



describe('GET /pets/2', () => {
    it('success fetch all pets by user Id', async () => {
        const response = await request(app)
        .get('/pets/2')
        .set('access_token', access_token)

        // console.log(response.body, "response>>>>");
        expect(response.status).toEqual(200)
        expect(Array.isArray(response.body)).toEqual(true)
        expect(response.body[0]).toHaveProperty("name")
        expect(response.body[0]).toHaveProperty("gender")
        expect(response.body[0]).toHaveProperty("species")
        expect(response.body[0]).toHaveProperty("description")

    })

    it('should send a response with 401 when user not login when fetch pet', async () => {
        const response = await request(app)
        .get('/pets/2')
        // .set('access_token', access_token)

        // console.log(response.body, "response>>>>");
      
        const expectedRes = {
            message: response.body.message
        }
    
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toEqual(expectedRes)

    })

    it('User does not exist', async () => {
        const response = await request(app)
        .get('/pets/10')
        .set('access_token', access_token)

        const expectedRes = {
            message: response.body.message
        }
    
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toEqual(expectedRes)
    })
})


describe("PUT /pets/:UserId/:id", () => {
    it('success edit pet accounnt', async () => {
        const response = await request(app)
        .put('/pets/2/1')
        .send({
            name: 'Bobo1',
            imgUrl: "bobooo",
            gender: 'Female',
            species : 'Cat', 
            breed : 'Himalayan',
            description : 'white cat' ,
            weight: "2 kg",
            UserId: 2
        })
        .set('access_token', access_token)

        expect(response.status).toEqual(200)
        expect(typeof response.body).toEqual('object')

        const expectedRes = {
            message: response.body.message
        }
    

        expect(response.body).toHaveProperty('message')
        expect(response.body).toEqual(expectedRes)
    })

    it('should send a response with 401 when user not login when edit pet', async () => {
        const response = await request(app)
        .put('/pets/2/1')
        .send({
            name: 'Bobo1',
            imgUrl: "bobooo",
            gender: 'Female',
            species : 'Cat', 
            breed : 'Himalayan',
            description : 'white cat' ,
            weight: "2 kg",
            UserId: 2
        })
        // .set('access_token', access_token)

        // console.log(response.body, "response>>>>");
      
        const expectedRes = {
            message: response.body.message
        }
    
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toEqual(expectedRes)

    })

    it('Pet does not exist', async () => {
        const response = await request(app)
        .put('/pets/2/100')
        .send({
            name: 'Bobo1',
            imgUrl: "bobooo",
            gender: 'Female',
            species : 'Cat', 
            breed : 'Himalayan',
            description : 'white cat' ,
            weight: "2 kg",
            UserId: 2
        })
        .set('access_token', access_token)

        const expectedRes = {
            message: response.body.message
        }
    
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toEqual(expectedRes)
    })

})



describe("Get /pet/:id", () => {
    it('success fetch pet accounnt by id', async () => {
        const response = await request(app)
        .get('/pet/1')
        .set('access_token', access_token)

        expect(response.status).toEqual(200)
        expect(typeof response.body).toEqual('object')

        // const expectedRes = {
        //     message: response.body.message
        // }
        console.log(response.body, ">>>>>>>>>>");
        
        // expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('name')
        expect(response.body).toHaveProperty('gender')
        expect(response.body).toHaveProperty('species')
        expect(response.body).toHaveProperty('breed')
        expect(response.body).toHaveProperty('description')


        // expect(response.body).toHaveProperty('message')
        // expect(response.body).toEqual(expectedRes)
    })

    it('should send a response with 401 when user not login when fetch pet by id', async () => {
        const response = await request(app)
        .get('/pet/1')
        // .set('access_token', access_token)
      

        // console.log(response.body, "response>>>>");
        const expectedRes = {
            message: response.body.message
        }
    
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toEqual(expectedRes)
      
    })

    it('Pet does not exist', async () => {
        const response = await request(app)
        .get('/pets/100')
        .set('access_token', access_token)

        const expectedRes = {
            message: response.body.message
        }
    
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toEqual(expectedRes)
    })


    

})

describe("DELETE /pets/:UserId/:id", () => {
    it('Sucess delete schedule', async () => {
        const response = await request(app).delete('/pets/2/1')
        .set('access_token', access_token)

        const expectedRes = {
            message: response.body.message
        }
    
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty("message")
         expect(response.body).toEqual(expectedRes)

    })

    it('Pet Not exist', async () => {
        const response = await request(app).delete('/pets/2/100')
        .set('access_token', access_token)

        const expectedRes = {
            message: response.body.message
        }
    
        expect(response.status).toEqual(404)
        expect(response.body).toHaveProperty("message")
         expect(response.body).toEqual(expectedRes)

    })

    


})

