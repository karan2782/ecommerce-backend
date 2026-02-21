const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Create order
exports.createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod = 'cod' } = req.body;

    // Get user's cart
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Validate shipping address
    if (!shippingAddress || !shippingAddress.street || !shippingAddress.city) {
      return res.status(400).json({ message: 'Please provide complete shipping address' });
    }

    // Check stock for all items
    for (let item of cart.items) {
      const product = item.product;
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`
        });
      }
    }

    // Create order
    const order = new Order({
      user: req.user.id,
      items: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price
      })),
      totalPrice: cart.totalPrice,
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending'
    });

    await order.save();

    // Reduce product stock
    for (let item of cart.items) {
      await Product.findByIdAndUpdate(
        item.product._id,
        { $inc: { stock: -item.quantity } }
      );
    }

    // For COD orders, clear cart immediately and mark as processing
    if (paymentMethod === 'cod') {
      await Cart.findOneAndUpdate(
        { user: req.user.id },
        { items: [], totalPrice: 0 }
      );
      
      order.orderStatus = 'processing';
      await order.save();
    }

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user's orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.product')
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Verify user owns the order
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to access this order' });
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update payment status (for COD orders when payment is collected)
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { orderId, paymentStatus, transactionId } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        paymentStatus,
        transactionId,
        orderStatus: paymentStatus === 'completed' ? 'processing' : 'pending'
      },
      { new: true }
    );

    res.status(200).json({ message: 'Payment status updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all orders (Admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('items.product');
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
