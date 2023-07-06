const mongoose = require("../db/conn"); //trocar para connection
const { Schema } = mongoose;

const Pet = mongoose.model(
  "Pet",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      weight: {
        type: Number,
        required: true,
      },
      color: {
        type: String,
      },
      images: {
        type: Arrey,
        required: true,
      },
      avaible: {
        type: Boolean,
      },
      user: Object,
      adopter: Object,
    },
    { timestamps: true }
  )
);

module.exports = Pet;
