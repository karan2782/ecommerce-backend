const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createOrder,
  getUserOrders,
  getOrderById,
  updatePaymentStatus,
  getAllOrders
} = require('../controllers/orderController');

// Protected routes
router.post('/', auth, createOrder);
router.get('/user-orders', auth, getUserOrders);
router.get('/:id', auth, getOrderById);
router.put('/payment-status', auth, updatePaymentStatus);

// Admin route
router.get('/', getAllOrders);

module.exports = router;
