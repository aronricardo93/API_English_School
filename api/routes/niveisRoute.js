const Router = require('express')
const NivelController = require('../controllers/NivelController')

const router = Router() 

router.get('/niveis', NivelController.pegarTodosOsNiveis)

module.exports = router