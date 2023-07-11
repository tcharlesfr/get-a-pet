const Pet = require("../models/Pet");

//helpers
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

module.exports = class PetController {
  //criar pet
  static async create(req, res) {
    const { name, age, weight, color } = req.body;

    const images = req.files;

    // setar como disponivel logo quando criado
    const available = true;

    // upload de imagens

    //validações
    if (!name) {
      res.status(422).json({ message: "o nome é obrigatorio" });
      return;
    }
    if (!age) {
      res.status(422).json({ message: "a idade é obrigatoria" });
      return;
    }
    if (!weight) {
      res.status(422).json({ message: "o peso é obrigatorio" });
      return;
    }
    if (!color) {
      res.status(422).json({ message: "a cor é obrigatoria" });
      return;
    }
    if (images.length === 0) {
      res.status(422).json({ message: "a imagem é obrigatoria" });
      return;
    }

    // pegando os dados do dono
    const token = getToken(req);
    const user = await getUserByToken(token);

    // criando pet
    const pet = new Pet({
      name,
      age,
      weight,
      color,
      available,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    });

    // percorrer as imagens e guardar apenas o nome
    images.map((image) => {
      pet.images.push(image.filename);
    });

    // salvando no banco de dados
    try {
      const newPet = await pet.save();
      res.status(201).json({ message: "pet cadastrado com sucesso", newPet });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async getAll(req, res) {
    const pets = await Pet.find().sort("-createdAt");

    res.status(200).json({ pets: pets });
  }
};
