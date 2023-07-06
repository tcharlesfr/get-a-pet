const User = require("../models/User");

module.exports = class UserController {
  static async register(req, res) {
    res.json("Olá register");
  }
};

// export const teste = async (req, res) => {

// } 