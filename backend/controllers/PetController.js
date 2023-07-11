const Pet = require('../models/Pet')

module.exports = class PetController {
    //criar pet
    static async create(req, res){
        res.json({message: "create ok"})
    }
}