const router = require('express').Router();
const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} = require('../middleware/verifyToken');
const userController = require('../controllers/user/index');

//GET ALL
router.get('/', verifyTokenAndAdmin, userController.getAllUser);

//GET
router.get('/:id', verifyTokenAndAdmin, userController.getUser);

//UPDATE
router.put('/:id', verifyTokenAndAuthorization, userController.editUser);

// DELETE
router.delete('/:id', verifyTokenAndAuthorization, userController.deleteUser);

module.exports = router;
