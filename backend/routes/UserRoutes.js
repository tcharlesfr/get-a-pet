const router = require ('express').Router();

const UserController = require('../controllers/UserController')
//UserController.register 
router.post('/register', UserController.register )

module.exports = router;