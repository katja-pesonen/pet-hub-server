const { Schema, model } = require("mongoose");
const PetModel = require("./Pet.model.js");
const User = require("./User.model.js")


const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: [true, 'Please make a comment.'],
    },

    author: {
        type: Schema.Types.ObjectId, ref: User 
      },

    pet: {
        type: Schema.Types.ObjectId, ref: PetModel 
      }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Comment = model("Pet", commentSchema);

module.exports = Comment;