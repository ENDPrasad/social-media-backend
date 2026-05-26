const mongoose = require("mongoose");


const PostSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, "Content is required"],
            trim: true,
            minlength: [2, "Content must be atleast 2 characters"],
            maxlength: [1000, "Content cannot exceed 1000 characters"], 
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        likes: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                }
            ],
            default: [],
        },

        comments: [
            {
                comment: {
                    type: String,
                    required: [true, "Comments is required"],
                    trim: true,
                    minlength: [2, "Comment should be atleast 2 characters"],
                    maxlength: [1000, "Comment cannot exceed 1000 characters"]
                },

                author: {
                    id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User",
                        required: [true, "User Id is required"]
                    },

                    name: {
                        type: String,
                        required: [true, "Name is required"]
                    }
                },

                createdAt: {
                    type: Date,
                    default: Date.now
                },
            }
        ],
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Post", PostSchema);