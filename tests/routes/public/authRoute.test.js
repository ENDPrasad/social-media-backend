const request = require("supertest");

const chai = require("chai");

const sinon = require("sinon");

const expect = chai.expect;

const app = require("../../../src/app");

const AuthController = require("../../../src/controllers/AuthController");

describe("Auth APIs", () => {
  let registerStub;

  let loginStub;

  beforeEach(() => {
    registerStub = sinon.stub(AuthController.prototype, "register");

    loginStub = sinon.stub(AuthController.prototype, "login");
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("POST /api/auth/register", () => {
    it("Should register user", async () => {
      registerStub.resolves({
        user: {
          id: "123",
          name: "Prasad",
          email: "prasad@test.com",
        },

        token: "mock-token",
      });

      const response = await request(app).post("/api/auth/register").send({
        name: "Prasad",
        email: "prasad@test.com",
        password: "123456",
      });

      expect(response.status).to.equal(201);

      expect(response.body.success).to.equal(true);

      expect(response.body.data.user.email).to.equal("prasad@test.com");
    });
  });

  describe("POST /api/auth/login", () => {
    it("Should login user", async () => {
      loginStub.resolves({
        user: {
          id: "123",
          email: "prasad@test.com",
        },

        token: "jwt-token",
      });

      const response = await request(app).post("/api/auth/login").send({
        email: "prasad@test.com",
        password: "123456",
      });

      expect(response.status).to.equal(200);

      expect(response.body.success).to.equal(true);

      expect(response.body.data.token).to.equal("jwt-token");
    });
  });
});
