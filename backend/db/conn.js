const mongoose = require("mongoose");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/db-get-a-pet");
  console.log("banco de dados conectado");
}

main().catch((err) => console.log(err));

module.exports = mongoose;
