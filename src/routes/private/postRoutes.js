const express = require("express");
const router = express.Router();
const PostController = require("../../controllers/PostController");
const UserController = require("../../controllers/UserController");
const { authMiddleware, setIsMe } = require("../../middlewares/authMiddleware");
const { Log } = require("../../services/log");
const {
  newPostValidation,
  newCommentValidation,
} = require("../../validations/PostValidation");
const validateMiddleware = require("../../middlewares/validateMiddleware");

const postController = new PostController();
const userController = new UserController();

router.post(
  "/newpost",
  validateMiddleware(newPostValidation()),
  authMiddleware,
  async (req, res) => {
    try {
      const data = await postController.newPost(req.body, req.user.id);

      return res.status(201).json({
        success: true,
        data,
      });
    } catch (error) {
      Log.child({
        errorMessage: error.message,
        errorStack: error.stack,
      }).error("Error in /newpost route");
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
);

router.get("/", authMiddleware, async (req, res) => {
  try {
    const data = await postController.fetchPosts(
      req.params,
      false,
      req.user.id,
    );

    return res.status(200).json({
      success: true,
      ...data,
    });
  } catch (error) {
    Log.child({
      errorMessage: error.message,
      errorStack: error.stack,
    }).error("Error at / route");
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/me", authMiddleware, setIsMe, async (req, res) => {
  try {
    const data = await postController.fetchPosts(
      req.params,
      req.isMe,
      req.user.id,
    );

    return res.status(200).json({
      success: true,
      ...data,
    });
  } catch (error) {
    Log.child({
      errorMessage: error.message,
      errorStack: error.stack,
    }).error("Error at /me router");
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/:id/likes", authMiddleware, async (req, res) => {
  try {
    const post = await postController.isPostExist(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found!",
      });
    }

    const data = await postController.postLikes(
      req.params.id,
      post,
      req.user.id,
    );

    return res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    Log.child({
      errorMessage: error.message,
      errorStack: error.stack,
    }).error("Error in /:id/likes route");
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post(
  "/:id/comments",
  validateMiddleware(newCommentValidation()),
  authMiddleware,
  async (req, res) => {
    try {
      const post = await postController.isPostExist(req.params.id);

      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found!",
        });
      }

      const user = await userController.profile(req.user.id);

      // const comment = req.body.comment
      const data = await postController.postComments(req.body, post, user);

      return res.status(201).json({
        success: true,
        data,
      });
    } catch (error) {
      Log.child({
        errorMessage: error.message,
        errorStack: error.stack,
      }).error("Error in /:id/comments route");
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
);

router.patch(
  "/:id",
  validateMiddleware(newPostValidation()),
  authMiddleware,
  async (req, res) => {
    try {
      const post = await postController.isPostExist(req.params.id);

      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found!",
        });
      }

      const data = await postController.editPost(
        req.body,
        post,
        req.user.id,
      );

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      Log.child({
        errorMessage: error.message,
        errorStack: error.stack,
      }).error("Error in /:id/comments route");
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
);

module.exports = router;
