const router = require('express').Router();
const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} = require('../middleware/verifyToken');
const cartController = require('../controllers/cart/index');

//CREATE
router.post('/', verifyToken, cartController.createCart);

//GET ALL
router.get('/', verifyTokenAndAdmin, cartController.getAllCart);

//GET
router.get('/:id', cartController.getCart);

// //UPDATE
router.put('/:id', verifyToken, cartController.editCart);

// // DELETE
router.delete('/:id', verifyToken, cartController.deleteCart);

module.exports = router;
