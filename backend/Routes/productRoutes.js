const express = require('express');
const router = express.Router();
const Product = require('../models/productsModels');
const asyncHandler = require('express-async-handler');


router.get('/', asyncHandler( async (req, res) => {
    // Changes to json Context type
    const products = await Product.find({});
    res.json(products);
}))


router.get('/:id', asyncHandler( async (req, res) => {
    // Changes to json Context type
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404)
        throw new Error('Product not Found')
        
    }
    
}))

module.exports = router