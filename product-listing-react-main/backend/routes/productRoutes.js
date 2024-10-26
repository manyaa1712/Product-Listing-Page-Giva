const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/Products', productController.createProduct);
router.get('/Products', productController.getProducts);
router.get('/Products/:id', productController.getProductById);
router.put('/Products/:id', productController.updateProduct);
router.delete('/Products/:id', productController.deleteProduct);

module.exports = router;
