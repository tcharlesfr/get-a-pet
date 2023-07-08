const createUserToken = require("../helpers/create-user-token");
const getToken = require("../helpers/get-token");

const User = require("../models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = class UserController {
  static async register(req, res) {
    // original desestruturado ex: {name, email, etc}
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

    if (userExists) {
      res.status(422).json({
        message: "por favor, utilize outro e-mail",
      });
      return;
    }

    // criar senha
    // adicionando criptografia, adicionando 12 caracteres a mais
    // fortificando a senha do usuario, mesmo vaze a senha e alguem queria fazer
    // engenharia reversa vai ser muito dificil pois n vai saber os parametros adicionados
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    //criar usuario
    const user = new User({
      // original apenas o campo ex: "name"
      name: name,
      email: email,
      phone: phone,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();

      //
      await createUserToken(newUser, req, res);
      return;
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  //login
  static async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      res.status(422).json({ message: "o email é obrigatorio" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "a password é obrigatorio" });
      return;
    }

    //chegar se o usuario já existe
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(422).json({
        message: "não existe usuario com este email",
      });
      return;
    }

    //checando a senha do banco de dados
    // o bcrypt descriptografa e compara as senhas
    const checkPassword = await bcrypt.compare(password, user.password);
    // mudar para verificação dupla, ou os dois com a mesma mensagem a fim
    // de não informar o que esta errado, mais proteção contra invasões
    if (!checkPassword) {
      res.status(422).json({
        message: "senha errada",
      });
      return;
    }
    //criando token
    await createUserToken(user, req, res);
  }

  //envia null ou o usuario que existe
  static async checkUser(req, res) {
    let currentUser;

    console.log(req.headers.authorization);

    if (req.headers.authorization) {
      //recebe o token e depois decodifica
      const token = getToken(req);
      const decoded = jwt.verify(token, "nossosecret");

      currentUser = await User.findById(decoded.id);

      // zerando a senha do usuario a ser enviado
      currentUser.password = undefined;
      // retorna null ou usuario atual
    } else {
      currentUser = null;
    }

    res.status(200).send(currentUser);
  }

  static async getUserById(req, res) {
    // pegando o id dos parametros
    const id = req.params.id;
    // encontrar o usuario
    // selecionando campos e escondendo a senha
    const user = await User.findById(id).select("-password");
    // verificação de existencia de usuario
    if (!user) {
      res.status(422).json({
        message: "não existe usuario",
      });
      return;
    }
    // retorna o usuario
    res.status(200).json({ user });
  }

  static async editUser (req, res){
    res.status(200).json({message: "ok"})
    return
  }









};
