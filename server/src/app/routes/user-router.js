const router = require('express').Router();
const controller = require('../controllers/user-controller');
const authentication = require('../middlewares/authentication');

router.post('/save', controller.save);
router.get('/find', authentication.authenticate, controller.findAll);
router.post('/auth', controller.auth);

module.exports = router;
