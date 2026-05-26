const PostService = require("../services/PostServices");

class PostController {

    constructor() {
        this.postService = new PostService();
    }

    async newPost(payload, userId){
        return await this.postService.createPost(payload, userId);
    }


    async fetchPosts(payload, isMe, userId){
        return await this.postService.fetchAllPosts(payload, isMe, userId);
    }

    async postLikes(payload, post, userId){
        return await this.postService.addLikes(payload, post, userId);
    }

    async postComments(payload, post, user){
        return await this.postService.addComments(payload, post, user);
    }

    async editPost(payload, post, userId){
        return await this.postService.updatePost(payload, post,userId);
    }

    async isPostExist(postId) {
        try{
            const post = await this.postService.getPostById(postId);

            if(!post){
                throw new Error("Post not found");
            }

            return post;
        }catch(error){
            Log.child({
                errorMessage: error.message,
                errorStack: error.stack
            }).error("Error in isPostExist()");
            throw error;
        }
    }
}


module.exports = PostController;