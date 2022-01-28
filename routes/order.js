const router = require('express').Router();
const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} = require('../middleware/verifyToken');
const orderController = require('../controllers/order/index');

//CREATE
router.post('/', verifyToken, orderController.createOrder);

//GET ALL
router.get('/', verifyTokenAndAdmin, orderController.getAllOrder);

// income last two month
router.get('/income', verifyTokenAndAdmin, orderController.getIncome);

//GET BY USER
router.get('/:id', verifyTokenAndAuthorization, orderController.getOrderByUser);

// //UPDATE
router.put('/:id', verifyTokenAndAdmin, orderController.editOrder);

// // DELETE
router.delete('/:id', verifyTokenAndAdmin, orderController.deleteOrder);

module.exports = router;
