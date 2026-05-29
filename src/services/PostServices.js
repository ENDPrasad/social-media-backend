const Post = require("../models/PostModel");
const { Log } = require("./log");

class PostService {
  async createPost(payload, userId) {
    try {
      const { content, author, likes, comments } = payload;

      const newPost = Post({
        content,
        author: userId,
        likes,
        comments,
      });

      await newPost.save();

      return {
        newPost: {
          id: newPost._id,
          content: newPost.content,
          author: newPost.author,
          likes: newPost.likes,
          comments: newPost.comments,
        },
      };
    } catch (error) {
      Log.child({
        errorMessage: error.message,
        errorStack: error.stack,
      }).error("Error in createPost");
      throw error;
    }
  }

  async fetchAllPosts(payload, isMe, userId) {
    try {
      const { sortBy } = payload;

      const page = parseInt(payload.page) || 1;
      const limit = parseInt(payload.limit) || 100;

      const query = {};

      if (isMe) {
        query.author = userId;
      } else {
        query.author = { $ne: userId };
      }

      const posts = await Post.find(query)
        .populate("author", "id name email")
        .sort({ createdAt: sortBy === "latest" ? -1 : 1 })
        .skip((page - 1) * limit)
        .limit(limit);

      const totalPosts = await Post.countDocuments(query);
      const totalPages = Math.ceil(totalPosts / limit);

      return {
        success: true,
        totalPosts,
        totalPages,
        page,
        limit,
        posts,
      };
    } catch (error) {
      Log.child({
        errorMessage: error.message,
        errorStack: error.stack,
      }).error("Error at fetchAllPosts()");
      throw error;
    }
  }

  async getPostById(postId) {
    try {
      const post = await Post.findById(postId);

      if (!post) {
        throw new Error("Post not found");
      }

      return post;
    } catch (error) {
      Log.child({
        errorMessage: error.message,
        errorStack: error.stack,
      }).error("Error in getPostById()");
      throw error;
    }
  }

  async getCommentById(commentId) {
    try{
        const comment = await Post.findById(commentId);

        if(!comment) {
            throw new Error("Comment not found");
        }

        return comment;
    }catch (error) {
      Log.child({
        errorMessage: error.message,
        errorStack: error.stack,
      }).error("Error in getCommentById()");
      throw error;
    }
  }

  async addLikes(payload, post, userId) {
    try {
      const { postId } = payload;

      let message;

      if (post.likes.includes(userId)) {
        post.likes.pull(userId);
        message = "Post Unliked";
      } else {
        post.likes.push(userId);
        message = "Post Liked";
      }

      await post.save();

      return {
        count: post.likes.length,
        message,
        post,
      };
    } catch (error) {
      Log.child({
        errorMessage: error.message,
        errorStack: error.stack,
      }).error("Error in addLikes()");
      throw error;
    }
  }

  async addComments(payload, post, user) {
    try {
      const postId = post._id;
      const { comment } = payload;

      const AddComment = [
        {
          comment,
          author: {
            id: user.id,
            name: user.name,
          },
        },
      ];

      const newComment = await Post.findByIdAndUpdate(
        postId,
        {
          $push: { comments: AddComment },
        },
        {
          new: true,
        },
      );

      return {
        newComment,
      };
    } catch (error) {
      Log.child({
        errorMessage: error.message,
        errorStack: error.stack,
      }).error("Error in addComments()");
      throw error;
    }
  }


  async updatePost(payload, post, userId) {
    try{
        const {content} = payload;

        if(post.author.toString() !== userId) {
            throw new Error("You don't have permisson to edit this post.");
        }

        const updatedPost = await Post.findByIdAndUpdate(
            post.id,
            {
                content: content
            },
            {
                new: true
            }
        );

        return {
            updatedPost,
        }
    }catch(error){
        Log.child({
            errorMessage: error.message,
            errorStack: error.stack
        }).error("Error in updatePost Service");
        throw error;
    }
  }


//   async updateComment(payload, post, comment, userId) {
//     try{
//         const {comment} = payload;

//         if(comment.author.toString() !== userId) {
//             throw new Error("You don't have permisson to edit this comment.");
//         }

//         const updatedComment = await 
//     }
//   }
}


module.exports = PostService;
