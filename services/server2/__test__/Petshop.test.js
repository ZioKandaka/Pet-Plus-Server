const request = require("supertest");
const { afterAll, expect, it, beforeAll } = require("@jest/globals");

const db = require("../models/index");
const queryInterface = db.sequelize.getQueryInterface();
const app = require("../app");

const seedDocSched = require("../library/seedDoctorSchedule");
const seedPetshop = require("../library/seedPetshops");
const seedDoctor = require("../library/seedDoctor");
const seedService = require("../library/seedService");

beforeAll(async () => {
  await seedPetshop();
  await seedService();
});

afterAll(async () => {
  db.sequelize.close();
});

describe("GET /petShops", () => {
  it("success get all data without filter", async () => {
    const response = await request(app).get("/petShops");
    expect(response.status).toEqual(200);

    expect(response.body[0]).toHaveProperty("name");
    expect(typeof response.body[0].name).toEqual("string");
    expect(response.body[0]).toHaveProperty("logo");
    expect(typeof response.body[0].logo).toEqual("string");
    expect(response.body[0]).toHaveProperty("address");
    expect(typeof response.body[0].address).toEqual("string");
    expect(response.body[0]).toHaveProperty("location");
    expect(typeof response.body[0].location).toEqual("object");
    expect(response.body[0]).toHaveProperty("phoneNumber");
    expect(typeof response.body[0].phoneNumber).toEqual("string");
    expect(response.body[0]).toHaveProperty("UserId");
    expect(typeof response.body[0].UserId).toEqual("number");
  });

  it("success get all data with name filter", async () => {
    const response = await request(app).get("/petShops?nameFilter=Pet Avenue");
    expect(response.status).toEqual(200);

    expect(response.body[0]).toHaveProperty("name");
    expect(typeof response.body[0].name).toEqual("string");
    expect(response.body[0].name).toEqual("Pet Avenue");
    expect(response.body[0]).toHaveProperty("UserId");
    expect(typeof response.body[0].UserId).toEqual("number");
    expect(response.body[0].UserId).toEqual(5);
    expect(response.body[0]).toHaveProperty("logo");
    expect(typeof response.body[0].logo).toEqual("string");
    expect(response.body[0].logo).toEqual("https://tinyurl.com/4fwy34fn");
  });

  it("success get all data with service filter", async () => {
    const response = await request(app).get("/petShops?serviceFilter=X-ray");
    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(2);
  });

  it("No petshop has service that is filtered", async () => {
    const response = await request(app).get("/petShops?serviceFilter=Grooming");
    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(0);
  });

  it("No petshop has name that is filtered", async () => {
    const response = await request(app).get("/petShops?nameFilter=KarsVetShop");
    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(0);
  });
});

describe("GET /petShops/:UserId", () => {
  it("success get data", async () => {
    const response = await request(app).get("/petShop/1");
    expect(response.status).toEqual(200);

    expect(response.body).toHaveProperty("name");
    expect(typeof response.body.name).toEqual("string");
    expect(response.body).toHaveProperty("logo");
    expect(typeof response.body.logo).toEqual("string");
    expect(response.body).toHaveProperty("address");
    expect(typeof response.body.address).toEqual("string");
    expect(response.body).toHaveProperty("location");
    expect(typeof response.body.location).toEqual("object");
    expect(response.body).toHaveProperty("phoneNumber");
    expect(typeof response.body.phoneNumber).toEqual("string");
    expect(response.body).toHaveProperty("UserId");
    expect(typeof response.body.UserId).toEqual("number");
  });

  it("Shop not exist", async () => {
    const response = await request(app).get("/petShop/99");
    expect(response.status).toEqual(404);

    expect(response.body).toHaveProperty("message");
    expect(typeof response.body.message).toEqual("string");
    expect(response.body.message).toEqual("Resource not found");
  });

  

});

describe("GET /petShops/around", () => {
  it("success get data", async () => {
    const response = await request(app).get(
      "/petShops/around?distance=100000000&lat=-0.7893&long=113.9213"
    );
    expect(response.status).toEqual(200);
    expect(response.body[0]).toHaveProperty("name");
    expect(typeof response.body[0].name).toEqual("string");
    expect(response.body[0]).toHaveProperty("logo");
    expect(typeof response.body[0].logo).toEqual("string");
    expect(response.body[0]).toHaveProperty("address");
    expect(typeof response.body[0].address).toEqual("string");
    expect(response.body[0]).toHaveProperty("location");
    expect(typeof response.body[0].location).toEqual("object");
  });

  it("No vet around user", async () => {
    const response = await request(app).get(
      "/petShops/around?distance=25000&lat=-0.7893&long=113.9213"
    );
    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(0);
  });
});

describe("POST /petShop/register", () => {
  it("success register", async () => {
    const response = await request(app).post("/petShop/register").send({
      name: "Kars Vet Clinic",
      address: "Makassar",
      latitude: "0.7893",
      longitude: "113.9213",
      phoneNumber: "08135598987",
      userId: 1,
    });
    expect(response.status).toEqual(201);
    expect(typeof response.body).toEqual("object");

    expect(response.body).toHaveProperty("name");
    expect(typeof response.body.name).toEqual("string");

    expect(response.body.name).toEqual("Kars Vet Clinic");
  });

  it("Missing name", async () => {
    const response = await request(app).post("/petShop/register").send({
      address: "Makassar",
      latitude: "0.7893",
      longitude: "113.9213",
      phoneNumber: "08135598987",
      userId: 1,
    });
    expect(response.status).toEqual(400);
    expect(typeof response.body).toEqual("object");

    expect(response.body).toHaveProperty("message");
    expect(typeof response.body.message).toEqual("string");

    expect(response.body.message).toEqual("Name is required");
  });
});

describe("PUT /petShop/:PetshopId", () => {
  it("success edit", async () => {
    const response = await request(app).put("/petShop/1").send({
      name: "Rey Vet Clinic",
      address: "Jakarta",
      latitude: "0.7893",
      longitude: "113.9213",
      phoneNumber: "08135598987",
    });
    expect(response.status).toEqual(201);
    expect(typeof response.body).toEqual("object");

    expect(response.body).toHaveProperty("message");
    expect(typeof response.body.message).toEqual("string");

    expect(response.body.message).toEqual("Update success");
  });

  it("Missing name", async () => {
    const response = await request(app).put("/petShop/1").send({
      name: null,
      address: "Makassar",
      latitude: "0.7893",
      longitude: "113.9213",
      phoneNumber: "08135598987",
    });
    expect(response.status).toEqual(400);
    expect(typeof response.body).toEqual("object");

    expect(response.body).toHaveProperty("message");
    expect(typeof response.body.message).toEqual("string");

    expect(response.body.message).toEqual("Name is required");
  });

  it("Vet not exist", async () => {
    const response = await request(app).put("/petShop/5").send({
      name: "Kars",
      address: "Makassar",
      latitude: "0.7893",
      longitude: "113.9213",
      phoneNumber: "08135598987",
      userId: 1,
    });
    expect(response.status).toEqual(404);
    expect(typeof response.body).toEqual("object");

    expect(response.body).toHaveProperty("message");
    expect(typeof response.body.message).toEqual("string");

    expect(response.body.message).toEqual("Resource not found");
  });
});
