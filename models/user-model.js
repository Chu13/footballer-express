const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: {
      type: String
    },
    username: {
      type: String
    },
    email: {
      type: String
    },
    encryptedPassword: {
      type: String
    },
     phone: {
      type: String
    },
    nationality: {
      type: String
    },
    position:{
      type: String
    },
    placeName: {
      type: String
    },
    location: {
      type: String
    },
    fields: {
      type: Number
    },
    admin: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);


const User = mongoose.model("User", userSchema);


module.exports = User;
