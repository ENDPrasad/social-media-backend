const request = require("supertest");
const chai = require("chai");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");
const User = require("../../../src/models/UserModel");
const expect = chai.expect;
const app = require("../../../src/app");
const PostController = require("../../../src/controllers/PostController");
const authMiddleware = require("../../../src/middlewares/authMiddleware");

describe("Post APIs", () => {
  let jwtStub;

  let userStub;

  let newPostStub;

//   let fetchAllPostStub;

  let getPostByIdStub;

  beforeEach(() => {
    jwtStub = sinon.stub(jwt, "verify");

    userStub = sinon.stub(User, "findById");

    newPostStub = sinon.stub(PostController.prototype, "newPost");

    // fetchAllPostStub = sinon.stub(PostController.prototype, "fetchAllPosts");

    getPostByIdStub = sinon.stub(PostController.prototype, "getPostById");
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("POST /api/posts/newPost", () => {
    it("Should create new post", async () => {
      jwtStub.returns({
        userId: "6a0b4a288165ed66f8b0cf84",
      });

      userStub.resolves({
        _id: "6a0b4a288165ed66f8b0cf84",
        name: "Sarath",
        email: "sarath2@gmail.com",
      });

      newPostStub.resolves({
        newPost: {
          newPost: {
            id: "6a12c6efb63d3ecf16f04f95",
            content: "This is my Secondt post",
            author: "6a0b4a288165ed66f8b0cf84",
            likes: [],
            comments: [],
          },
        },
      });

      const response = await request(app)
        .post("/api/posts/newPost")
        .set("Authorization", `Bearer fake-token`)
        .send({
          content: "This is my Secondt post",
        });

      expect(response.status).to.equal(201);

      expect(response.body.success).to.equal(true);
    });
  });

//   describe("GET /api/posts", () => {
//     it("Should fetch all posts", async () => {

//       jwtStub.returns({
//         userId: "6a0b4a288165ed66f8b0cf84",
//       });

//       fetchAllPostStub.resolves({

//       })
//     });
//   });

//   describe("GET /api/posts/:id", () => {
//     it("Should get post by id", async () => {
//       jwtStub.returns({
//         userId: "6a0b4a288165ed66f8b0cf84",
//       });

//       userStub.resolves({
//         _id: "6a0b4a288165ed66f8b0cf84",
//         name: "Sarath",
//         email: "sarath2@gmail.com",
//       });

//       getPostByIdStub.resolves({});
//     });
//   });
});
