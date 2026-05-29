const request = require("supertest");
const chai = require("chai");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");
const User = require("../../../src/models/UserModel")
const expect = chai.expect;
const app = require("../../../src/app");
const UserController = require("../../../src/controllers/UserController");
const authMiddleware = require("../../../src/middlewares/authMiddleware");

describe("User APIs", () => {
  let profileStub;

  let jwtStub;

  let userStub;

  beforeEach(() => {
    profileStub = sinon.stub(UserController.prototype, "profile");

    jwtStub = sinon.stub(jwt, "verify");

    userStub = sinon.stub(User, 'findById');

  });

  afterEach(() => {
    sinon.restore();
  });

  describe("GET /api/users/profile", () => {
    it("Should fetch user details", async () => {

      jwtStub.returns({
        userId: "6a0b4a288165ed66f8b0cf84"
      });

      userStub.resolves({
        _id: "6a0b4a288165ed66f8b0cf84",
          name: "Sarath",
          email: "sarath2@gmail.com",
      })
      profileStub.resolves({
        _id: "6a0b4a288165ed66f8b0cf84",
          name: "Sarath",
          email: "sarath2@gmail.com",
      });


      const response = await request(app).get("/api/users/profile").set(
        "Authorization",
        `Bearer fake-token`
      );

      expect(response.status).to.equal(200);

      expect(response.body.success).to.equal(true);

      expect(response.body.data.email).to.equal("sarath2@gmail.com");
    });
  });
});
