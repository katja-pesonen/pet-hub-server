const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: 'true',
      required: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      lowercase: true,
      trim: true
    },

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
