const User = require("../models/User");

module.exports = class UserController {
  static async register(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;

    //validações
    if (!name) {
      res.status(422).json({ message: "o nome é obrigatorio" });
      return;
    }
    if (!email) {
      res.status(422).json({ message: "o email é obrigatorio" });
      return;
    }
    if (!phone) {
      res.status(422).json({ message: "o phone é obrigatorio" });
      return;
    }
    if (!password) {
      res.status(422).json({ message: "a password é obrigatorio" });
      return;
    }
    if (!confirmpassword) {
      res.status(422).json({ message: "a confirmpassword é obrigatorio" });
      return;
    }
    if (password !== confirmpassword) {
      res
        .status(422)
        .json({ message: "a senha e a confirmação de senha deve ser iguais" });
      return;
    }

    //validar se o email é email

    //chegar se o usuario já existe
    const userExists = await User.findOne({ email: email });

    if (userExists){
      res.status(422).json({
        message: "por favor, utilize outro e-mail"
      })
      return
    }
  }
};
