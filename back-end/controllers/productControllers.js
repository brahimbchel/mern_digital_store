const mongoose = require('mongoose')
const Product = require('../models/Product')
const bcrypt = require('bcrypt')

const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find().populate('user', 'username email');
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('user', 'username email');
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, user, link } = req.body;
        const product = new Product({
            name,
            description,
            price,
            image,
            user,
            link
        });
        await product.save();
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ error: 'Invalid user ID' })
        }
    
        const product = await Product.findOneAndUpdate(
          { _id: id },
          { $set: req.body },
          { new: true }
        )
    
        if (!product) {
          return res.status(404).json({ error: 'Product not found' })
        }
    
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid product ID' })
        }

        const product = await Product.findOneAndDelete({ _id: id })

        if (!product) {
        return res.status(404).json({ error: 'Product not found' })
        }

        // res.status(200).json(product)
        res.status(200).json({ message: 'Product removed' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

module.exports = {
    getAllProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}