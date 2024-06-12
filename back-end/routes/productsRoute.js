const express = require('express')
const router = express.Router()

const { getAllProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productControllers')

const { isAdmin, isAuthenticated } = require('../middleware/authVerify');

router.get('/', getAllProduct)

router.get('/:id', getProductById)

router.post('/', isAdmin, isAuthenticated, createProduct)

// Update User
router.patch('/:id', updateProduct)

router.delete('/:id', deleteProduct)

module.exports = router