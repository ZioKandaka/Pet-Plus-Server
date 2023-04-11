const request = require('supertest')
const {afterAll, expect, it, beforeAll} = require('@jest/globals')

const db = require('../models/index')
const queryInterface = db.sequelize.getQueryInterface()
const app = require('../app')

const seedDocSched = require('../library/seedDoctorSchedule')
const seedPetshop = require('../library/seedPetshops')
const seedDoctor = require('../library/seedDoctor')


beforeAll(async () => {
    await seedPetshop()
    await seedDoctor()
    await seedDocSched()
})

afterAll(async () => {
    db.sequelize.close()
})

describe('GET /doctorSchedule/:DoctorId/:PetshopId', () => {
    it('success get data', async () => {
        const response = await request(app).get('/doctorSchedule/1/1')
        expect(response.status).toEqual(200)
        expect(response.body.length).toEqual(4)
        // expect(typeof response.body).toEqual('array')

        expect(response.body[0]).toHaveProperty('day')
        expect(typeof response.body[0].day).toEqual("string")
        expect(response.body[0]).toHaveProperty('time')
        expect(typeof response.body[0].time).toEqual("string")
        expect(response.body[0]).toHaveProperty('status')
        expect(typeof response.body[0].status).toEqual("string")
        expect(response.body[0]).toHaveProperty('PetshopId')
        expect(typeof response.body[0].PetshopId).toEqual("number")
        expect(response.body[0]).toHaveProperty('DoctorId')
        expect(typeof response.body[0].DoctorId).toEqual("number")
    })

    it('Does not have any schedule', async () => {
        const response = await request(app).get('/doctorSchedule/99/99')
        expect(response.status).toEqual(404)
        expect(response.body.message).toEqual('Resource not found')
    })
})

describe("POST /doctorSchedule/:DoctorId/:PetshopId", () => {
    it('Sucess created schedule', async () => {
        const response = await request(app).post('/doctorSchedule/1/1').send({
            day : 'Saturday',
            time: "Session 1",
            status: 'Available'
        })

        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty("day")
        expect(response.body).toHaveProperty("time")
        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("PetshopId")
        expect(response.body).toHaveProperty("DoctorId")
    })

    it('Schedule exist', async () => {
        const response = await request(app).post('/doctorSchedule/1/1').send({
            day : 'Saturday',
            time: "Session 1",
            status: 'Available'
        })

        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toEqual("Schedule already exist")
    })
})

describe("PUT /doctorSchedule/:DoctorScheduleId", () => {
    it('Sucess edit schedule', async () => {
        const response = await request(app).put('/doctorSchedule/9').send({
            day : 'Monday',
            time: "Session 2",
            status: 'Unavailable'
        })

        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toEqual("Schedule has been updated")
    })

    it('Schedule not exist', async () => {
        const response = await request(app).put('/doctorSchedule/22').send({
            day : 'Saturday',
            time: "Session 1",
            status: 'Available'
        })

        expect(response.status).toEqual(404)
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toEqual("Resource not found")
    })
})

describe("DELETE /doctorSchedule/:DoctorScheduleId", () => {
    it('Sucess delete schedule', async () => {
        const response = await request(app).delete('/doctorSchedule/1')

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toEqual("Schedule deleted")
    })

    it('Schedule not exist', async () => {
        const response = await request(app).delete('/doctorSchedule/22')

        expect(response.status).toEqual(404)
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toEqual("Resource not found")
    })
})