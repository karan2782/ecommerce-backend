const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart
} = require('../controllers/cartController');

// All routes are protected
router.get('/', auth, getCart);
router.post('/add', auth, addToCart);
router.post('/remove', auth, removeFromCart);
router.post('/update-quantity', auth, updateQuantity);
router.post('/clear', auth, clearCart);

module.exports = router;
