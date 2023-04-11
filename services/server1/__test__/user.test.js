const request = require("supertest");
const { afterAll, expect, it, beforeAll } = require("@jest/globals");

const db = require("../models/index");
const queryInterface = db.sequelize.getQueryInterface();
const app = require("../app");

const bulkInsertUser = require("../library/seedUser");
const { createToken } = require("../middlewares/jwt");
let access_token = createToken({ UserId: 1 });

beforeAll(async () => {
  await bulkInsertUser();
});

afterAll(async () => {
  db.sequelize.close();
});

describe("POST /register", () => {
  it("success register", async () => {
    const response = await request(app)
      .post("/register")
      .field("username", "Maxikars")
      .field("fullName", "Kars Sugoi")
      .field("email", "MaxKars@mail.com")
      .field("password", "123456")
      .field("phoneNumber", "081341321585")
      .field("address", "Jakarta")
      .field("role", "owner")
      .attach("imgUrl", "./files/photo.jpg");

    expect(response.status).toEqual(201);
    expect(typeof response.body).toEqual("object");

    expect(response.body).toHaveProperty("message");
    expect(typeof response.body.message).toEqual("string");

    expect(response.body.message).toEqual("Account created");
  });

  it("User did not input username", async () => {
    const response = await request(app)
      .post("/register")
      .field("fullName", "Kars Sugoi")
      .field("email", "MaxKars@mail.com")
      .field("password", "123456")
      .field("phoneNumber", "081341321585")
      .field("address", "Jakarta")
      .field("role", "owner")
      .attach("imgUrl", "./files/photo.jpg");
    // console.log(response.body);
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("Username is required");
  });

  it("Username already exist", async () => {
    const response = await request(app)
      .post("/register")
      .field("username", "Maxikars")
      .field("fullName", "Kars Sugoi")
      .field("email", "MaxKars@mail.com")
      .field("password", "123456")
      .field("phoneNumber", "081341321585")
      .field("address", "Jakarta")
      .field("role", "owner")
      .attach("imgUrl", "./files/photo.jpg");
    // console.log(response.body);
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("Username already exist");
  });

  it("User did not input email", async () => {
    const response = await request(app)
      .post("/register")
      .field("username", "Devira")
      .field("fullName", "Dev Sugoi")
      .field("password", "123456")
      .field("phoneNumber", "081341321585")
      .field("address", "Jakarta")
      .field("role", "owner")
      .attach("imgUrl", "./files/photo.jpg");
    // console.log(response.body);
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("Email is required");
  });

  it("Email already used", async () => {
    const response = await request(app)
      .post("/register")
      .field("username", "Randy")
      .field("fullName", "Randy Orthon")
      .field("email", "MaxKars@mail.com")
      .field("password", "123456")
      .field("phoneNumber", "081341321585")
      .field("address", "Jakarta")
      .field("role", "owner")
      .attach("imgUrl", "./files/photo.jpg");
    // console.log(response.body);
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("E-mail already exist");
  });

  it("User did not input password", async () => {
    const response = await request(app)
      .post("/register")
      .field("username", "Huseng")
      .field("fullName", "Hus Sugoi")
      .field("email", "Husen@mail.com")
      .field("phoneNumber", "081341321585")
      .field("address", "Jakarta")
      .field("role", "owner")
      .attach("imgUrl", "./files/photo.jpg");
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("Password is required");
  });

  it("User input password but length less than 5 char", async () => {
    const response = await request(app)
      .post("/register")
      .field("username", "Huseng")
      .field("fullName", "Hus Sugoi")
      .field("email", "Husen@mail.com")
      .field("password", "1234")
      .field("phoneNumber", "081341321585")
      .field("address", "Jakarta")
      .field("role", "owner")
      .attach("imgUrl", "./files/photo.jpg");
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual(
      "Password length must be at least 5 characters"
    );
  });

  it("User did not input full name", async () => {
    const response = await request(app)
      .post("/register")
      .field("username", "Huseng")
      .field("email", "Husen@mail.com")
      .field("password", "1234")
      .field("phoneNumber", "081341321585")
      .field("address", "Jakarta")
      .field("role", "owner")
      .attach("imgUrl", "./files/photo.jpg");
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("Full name is required");
  });

  it("User did not input phone number", async () => {
    const response = await request(app)
      .post("/register")
      .field("username", "Huseng")
      .field("email", "Husen@mail.com")
      .field("fullName", "Kol")
      .field("password", "123456")
      .field("address", "Jakarta")
      .field("role", "owner")
      .attach("imgUrl", "./files/photo.jpg");
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("Phone number is required");
  });

  it("Client did not hard code role", async () => {
    const response = await request(app)
      .post("/register")
      .field("username", "Huseng")
      .field("fullName", "Hus Sugoi")
      .field("email", "Husen@mail.com")
      .field("password", "1234")
      .field("phoneNumber", "081341321585")
      .field("address", "Jakarta")
      .attach("imgUrl", "./files/photo.jpg");
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("Role is required");
  });
});

describe("POST /login", () => {
  it("success login", async () => {
    const response = await request(app).post("/login").send({
      email: "bobby@mail.com",
      password: "123456",
    });
    expect(response.status).toEqual(200);
    expect(typeof response.body).toEqual("object");

    expect(response.body).toHaveProperty("access_token");
    expect(typeof response.body.access_token).toEqual("string");
    expect(response.body).toHaveProperty("UserId");
    expect(typeof response.body.UserId).toEqual("number");
    expect(response.body).toHaveProperty("role");
    expect(typeof response.body.role).toEqual("string");
    expect(response.body).toHaveProperty("username");
    expect(typeof response.body.username).toEqual("string");

    expect(response.body.UserId).toEqual(2);
  });

  it("User does not input email", async () => {
    const response = await request(app).post("/login").send({
      password: "123456",
    });
    expect(response.status).toEqual(400);
    expect(typeof response.body).toEqual("object");
    expect(response.body.message).toEqual("Please fill email");
  });

  it("User does not input password", async () => {
    const response = await request(app).post("/login").send({
      email: "bobby@mail.com",
    });
    expect(response.status).toEqual(400);
    expect(typeof response.body).toEqual("object");
    expect(response.body.message).toEqual("Please fill password");
  });

  it("User do not have account", async () => {
    const response = await request(app).post("/login").send({
      email: "bedul@mail.com",
      password: "123456",
    });
    expect(response.status).toEqual(401);
    expect(typeof response.body).toEqual("object");
    expect(response.body.message).toEqual("Wrong email or password");
  });

  it("User input wrong password", async () => {
    const response = await request(app).post("/login").send({
      email: "artour@mail.com",
      password: "123456789",
    });
    expect(response.status).toEqual(401);
    expect(typeof response.body).toEqual("object");
    expect(response.body.message).toEqual("Wrong email or password");
  });
});

describe("PUT /user/:UserId", () => {
  it("success edit account", async () => {
    const response = await request(app)
      .put("/user/2")
      .set("access_token", access_token)
      .field("username", "Bahy")
      .field("fullName", "Bedul Bahy")
      .field("email", "bahy@mail.com")
      .field("password", "123456")
      .field("phoneNumber", "081341321585")
      .field("address", "Jakarta")
      .field("role", "owner")
      .attach("imgUrl", "./files/photo.jpg");

    expect(response.status).toEqual(201);
    expect(typeof response.body).toEqual("object");

    expect(response.body).toHaveProperty("message");
    expect(typeof response.body.message).toEqual("string");

    expect(response.body.message).toEqual("Your account has been updated");
  });

  it("Username already exist", async () => {
    const response = await request(app)
      .put("/user/2")
      .set("access_token", access_token)
      .field("username", "Pet Vet")
      .field("fullName", "Bedul Bahy")
      .field("email", "bahy@mail.com")
      .field("password", "123456")
      .field("phoneNumber", "081341321585")
      .field("address", "Jakarta")
      .field("role", "owner")
      .attach("imgUrl", "./files/photo.jpg");

    expect(response.status).toEqual(400);
    expect(typeof response.body).toEqual("object");

    expect(response.body).toHaveProperty("message");
    expect(typeof response.body.message).toEqual("string");

    expect(response.body.message).toEqual("Username already exist");
  });

  it("Email already exist", async () => {
    const response = await request(app)
      .put("/user/2")
      .set("access_token", access_token)
      .field("username", "Gio")
      .field("fullName", "Bedul Bahy")
      .field("email", "artour@mail.com")
      .field("password", "123456")
      .field("phoneNumber", "081341321585")
      .field("address", "Jakarta")
      .field("role", "owner")
      .attach("imgUrl", "./files/photo.jpg");

    expect(response.status).toEqual(400);
    expect(typeof response.body).toEqual("object");

    expect(response.body).toHaveProperty("message");
    expect(typeof response.body.message).toEqual("string");

    expect(response.body.message).toEqual("E-mail already exist");
  });

  it("User does not exist", async () => {
    const response = await request(app)
      .put("/user/99")
      .set("access_token", access_token)
      .field("username", "Insay")
      .field("fullName", "Bedul Bahy")
      .field("email", "razy@mail.com")
      .field("password", "123456")
      .field("phoneNumber", "081341321585")
      .field("address", "Jakarta")
      .field("role", "owner")
      .attach("imgUrl", "./files/photo.jpg");

    expect(response.status).toEqual(404);
    expect(typeof response.body).toEqual("object");

    expect(response.body).toHaveProperty("message");
    expect(typeof response.body.message).toEqual("string");

    expect(response.body.message).toEqual("Resource not found");
  });
});

describe("GET /user/:UserId", () => {
  it("success get", async () => {
    const response = await request(app)
      .get("/user/1")
      .send({
        username: "Maxikars",
        fullName: "Kars Sugoi",
        email: "MaxKars@mail.com",
        password: "123456",
        phoneNumber: "081212345678",
        address: "address",
        role: "owner",
      })
      .set("access_token", access_token);

    expect(response.status).toEqual(200);
    expect(typeof response.body).toEqual("object");

    expect(response.body).toHaveProperty("username");
    expect(response.body).toHaveProperty("fullName");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("phoneNumber");
    expect(response.body).toHaveProperty("address");
    expect(response.body).toHaveProperty("role");
    expect(response.body).toHaveProperty("password");

    expect(response.body.password).toEqual("unknown");
  });

  it("user not found", async () => {
    const response = await request(app)
      .get("/user/99")
      .set("access_token", access_token);

    expect(response.status).toEqual(404);
    expect(typeof response.body).toEqual("object");

    expect(response.body).toHaveProperty("message");
    expect(typeof response.body.message).toEqual("string");

    expect(response.body.message).toEqual("Resource not found");
  });
});
