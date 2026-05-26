const request = require("supertest");

const chai = require("chai");

const sinon = require("sinon");

const expect = chai.expect;

const app = require("../../../src/app");

const AuthController = require("../../../src/controllers/AuthController");

describe("Auth APIs", () => {
  let registerStub;

  let loginStub;

  let existingUserStub;

  beforeEach(() => {
    registerStub = sinon.stub(AuthController.prototype, "register");

    loginStub = sinon.stub(AuthController.prototype, "login");

    existingUserStub = sinon.stub(AuthController.prototype, "existingUser");
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("POST /api/auth/register", () => {
    it("Should register user", async () => {
      existingUserStub.resolves(false);

      registerStub.resolves({
        user: {
          id: "6a0dcdcdf1389f37433d5a41",
          name: "Sarath",
          email: "sarath1@gmail.com",
        },
        token: "mock-token",
      });

      const response = await request(app).post("/api/auth/register").send({
        name: "Sarath",
        email: "sarath1@gmail.com",
        password: "123456789",
      });

      expect(response.status).to.equal(201);

      expect(response.body.success).to.equal(true);

      expect(response.body.data.user.email).to.equal("sarath1@gmail.com");
    });
  });

  describe("POST /api/auth/login", () => {
    it("Should login user", async () => {
      existingUserStub.resolves(true);

      loginStub.resolves({
        user: {
          id: "6a0dcdcdf1389f37433d5a41",
          name: "Sarath",
          email: "sarath1@gmail.com",
        },
        token: "jwt-token",
      });

      const response = await request(app).post("/api/auth/login").send({
        email: "sarath1@gmail.com",
        password: "123456789",
      });

      expect(response.status).to.equal(200);

      expect(response.body.success).to.equal(true);

      expect(response.body.data.token).to.equal("jwt-token");
    });
  });
});
