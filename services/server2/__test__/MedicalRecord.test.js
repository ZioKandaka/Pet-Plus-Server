const request = require("supertest");
const { afterAll, expect, it, beforeAll } = require("@jest/globals");

const db = require("../models/index");
const queryInterface = db.sequelize.getQueryInterface();
const app = require("../app");

const seedPetshop = require("../library/seedPetshops");
const seedAction = require("../library/seedAction");
const seedPetSchedule = require("../library/seedPetSchedule");
const seedDoctor = require("../library/seedDoctor");
const seedService = require("../library/seedService");
const seedMedicalRecord = require("../library/seedMedicalRecord");
const seedDocSched = require("../library/seedDoctorSchedule");

beforeAll(async () => {
  await seedPetshop();
  await seedDoctor();
  await seedDocSched();
  await seedPetSchedule();
  await seedMedicalRecord();
  await seedService();
  await seedAction();
});

afterAll(async () => {
  db.sequelize.close();
});

describe("GET /medicalRecord/:PetId", () => {
  it("success get data", async () => {
    const response = await request(app).get("/medicalRecord/1");
    expect(response.status).toEqual(200);

    expect(response.body[0]).toHaveProperty("notes");
    expect(typeof response.body[0].notes).toEqual("string");

    expect(response.body[0]).toHaveProperty("PetId");
    expect(typeof response.body[0].PetId).toEqual("number");

    expect(response.body[0]).toHaveProperty("DoctorId");
    expect(typeof response.body[0].DoctorId).toEqual("number");

    expect(response.body[0]).toHaveProperty("PetScheduleId");
    expect(typeof response.body[0].PetScheduleId).toEqual("number");

    expect(response.body[0]).toHaveProperty("PetshopId");
    expect(typeof response.body[0].PetshopId).toEqual("number");
  });
});

describe("POST /medicalRecord/:PetId", () => {
  it("success post data", async () => {
    const response = await request(app).post("/medicalRecord").send({
      notes: "Testing post",
      PetId: 1,
      DoctorId: 1,
      PetScheduleId: 2,
      PetshopId: 1
    });
    expect(response.status).toEqual(201);

    expect(response.body).toHaveProperty("notes");
    expect(typeof response.body.notes).toEqual("string");

    expect(response.body).toHaveProperty("PetId");
    expect(typeof response.body.PetId).toEqual("number");

    expect(response.body).toHaveProperty("DoctorId");
    expect(typeof response.body.DoctorId).toEqual("number");

    expect(response.body).toHaveProperty("PetScheduleId");
    expect(typeof response.body.PetScheduleId).toEqual("number");

    expect(response.body).toHaveProperty("PetshopId");
    expect(typeof response.body.PetshopId).toEqual("number");
  });
});

describe("POST /medicalRecord/:PetId", () => {
  it("Faild due to null notes", async () => {
    const response = await request(app).post("/medicalRecord").send({
      notes: null,
      PetId: 1,
      DoctorId: 1,
      PetScheduleId: 2,
      PetshopId: 1
    });
    expect(response.status).toEqual(400);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("notes is required")
  });
});

describe("POST /action/:MedicalRecordId", () => {
  it("success post data", async () => {
    const response = await request(app).post("/action/2").send({
      totalPrice: 525000,
      ServiceId: 1
    });
    expect(response.status).toEqual(201);

    expect(response.body).toHaveProperty("totalPrice");
    expect(typeof response.body.totalPrice).toEqual("number");

    expect(response.body).toHaveProperty("MedicalRecordId");
    expect(typeof response.body.MedicalRecordId).toEqual("number");

    expect(response.body).toHaveProperty("ServiceId");
    expect(typeof response.body.ServiceId).toEqual("number")
  });
});

describe("POST /action/:MedicalRecordId", () => {
  it("Failed due to null total price", async () => {
    const response = await request(app).post("/action/2").send({
      totalPrice: null,
      ServiceId: 1
    });
    expect(response.status).toEqual(400);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Total price is required");
  });
});
