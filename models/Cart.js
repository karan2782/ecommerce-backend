const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
      }
    }
  ],
  totalPrice: {
    type: Number,
    default: 0
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to calculate total price
cartSchema.methods.calculateTotal = function() {
  return this.populate('items.product').then(() => {
    this.totalPrice = this.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
    return this.save();
  });
};

module.exports = mongoose.model('Cart', cartSchema);
