const Router = require('express')
const TurmaController = require('../controllers/TurmaController')

const router = Router()

router.get('/turmas', TurmaController.pegarTodasAsTurmas)

module.exports = router