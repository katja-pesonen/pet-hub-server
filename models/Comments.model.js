const { Schema, model } = require("mongoose");


const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: [true, 'Please make a comment.'],
    },

    author: {
        type: String, 
      },

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;