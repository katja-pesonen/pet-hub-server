const { Schema, model } = require("mongoose");
const Comment = require("./Comments.model.js");
const User = require("./User.model.js")

const petSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Pet name is required.'],
    },
    type: {
        type: String,
        trim: true,
        required: [true, 'Type of animal is required.'],
      },
    age: {
      type: Number,
      required: [true, 'Age is required.'],
    },
    description: {
      type: String,
    },
    image: {
        type: String,
      },
    owner: {
        type: Schema.Types.ObjectId, ref: User 
      },

    comments: [{
        type: Schema.Types.ObjectId, ref: Comment
      }],

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const PetModel = model("Pet", petSchema);

module.exports = PetModel;