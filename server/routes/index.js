var express = require('express')
var router = express.Router()
var home_controller = require('../controllers/house_controller')

router.get('/houses',home_controller.getAll)
router.get('/houses/:id',home_controller.getByid)
router.post('/houses',home_controller.createHouse)
router.put('/houses/:id',home_controller.updateById)
router.delete('/houses/:id',home_controller.deleteById)



module.exports = router;
