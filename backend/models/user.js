const mongoose = require("../db/conn"); //trocar para connection
const { Schema } = mongoose;

const User = mongoose.Model(
  "User",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      img: {
        type: String,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = User;
