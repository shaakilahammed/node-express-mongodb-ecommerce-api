const router = require('express').Router();
const authController = require('../controllers/auth/index');

router.post('/register', authController.register);

module.exports = router;
