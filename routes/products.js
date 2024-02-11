const express = require('express');
const router = express.Router();
const productsData = require('../products.json');

router.get('/', (req, res) => {
  res.json(productsData);
});

router.get('/:id', (req, res) => {
  const productId = req.params.id;
  const productKeys = Object.keys(productsData);

  if (productKeys.includes(productId)) {
    const product = productsData[productId];
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});
router.get('/instock/:qt', (req, res) => {
    const quantity = parseInt(req.params.qt, 10);
    const filteredProducts = {};
    console.log(productsData);
    for (let productId in productsData) {
      if (productsData.hasOwnProperty(productId)) {
        const product = productsData[productId];
        if (product.stock >= quantity) {
          filteredProducts[productId] = product;
        }
      }
    }

    if (Object.keys(filteredProducts).length === 0) {
      res.status(404).json({ error: 'No products in stock with the specified quantity' });
    } else {
      res.json(filteredProducts);
    }
  });

router.get('/:id/:qt', (req, res) => {
    const productId = req.params.id;
    const quantity = parseInt(req.params.qt);
    const productKeys = Object.keys(productsData);

    if (productKeys.includes(productId)) {
      const product = productsData[productId];
      const unitPrice = product.price;
      const totalPrice = unitPrice * quantity;
      res.json({
        id: productId,
        qt: quantity,
        'unit price': unitPrice,
        total_price: totalPrice
      });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  });
 

module.exports = router;