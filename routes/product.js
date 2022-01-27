const router = require('express').Router();
const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} = require('../middleware/verifyToken');
const productController = require('../controllers/product/index');

//CREATE
router.post('/', verifyTokenAndAdmin, productController.createProduct);

//GET ALL
router.get('/', productController.getAllProduct);

//GET
router.get('/:id', productController.getProduct);

//UPDATE
router.put('/:id', verifyTokenAndAdmin, productController.editProduct);

// DELETE
router.delete('/:id', verifyTokenAndAdmin, productController.deleteProduct);

module.exports = router;
