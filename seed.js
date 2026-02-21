const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Previous products cleared');

    const products = [
      {
        name: 'Laptop Pro',
        description: 'High-performance laptop perfect for programming and design work',
        price: 1299.99,
        category: 'Electronics',
        image: 'https://picsum.photos/id/1/400/400',
        stock: 30,
        rating: 4.8,
        numReviews: 45
      },
      {
        name: 'Wireless Headphones',
        description: 'Premium noise-cancelling wireless headphones with 30-hour battery',
        price: 299.99,
        category: 'Electronics',
        image: 'https://picsum.photos/id/2/400/400',
        stock: 50,
        rating: 4.5,
        numReviews: 120
      },
      {
        name: 'USB-C Cable',
        description: 'Durable USB-C cable for fast charging and data transfer',
        price: 19.99,
        category: 'Electronics',
        image: 'https://picsum.photos/id/3/400/400',
        stock: 200,
        rating: 4.3,
        numReviews: 85
      },
      {
        name: 'Mechanical Keyboard',
        description: 'RGB mechanical keyboard with hot-swappable switches',
        price: 149.99,
        category: 'Electronics',
        image: 'https://picsum.photos/id/4/400/400',
        stock: 60,
        rating: 4.7,
        numReviews: 200
      },
      {
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with precision tracking',
        price: 49.99,
        category: 'Electronics',
        image: 'https://picsum.photos/id/5/400/400',
        stock: 100,
        rating: 4.4,
        numReviews: 150
      },
      {
        name: 'Monitor 4K',
        description: '27-inch 4K Ultra HD monitor with HDR support',
        price: 599.99,
        category: 'Electronics',
        image: 'https://picsum.photos/id/6/400/400',
        stock: 25,
        rating: 4.6,
        numReviews: 95
      },
      {
        name: 'Smartwatch Pro',
        description: 'Fitness tracking smartwatch with heart rate and GPS',
        price: 249.99,
        category: 'Electronics',
        image: 'https://picsum.photos/id/7/400/400',
        stock: 45,
        rating: 4.5,
        numReviews: 88
      },
      {
        name: 'Tablet 10"',
        description: '10-inch tablet with HD display for work and entertainment',
        price: 349.99,
        category: 'Electronics',
        image: 'https://picsum.photos/id/8/400/400',
        stock: 35,
        rating: 4.4,
        numReviews: 72
      },
      {
        name: 'Webcam HD',
        description: '1080p webcam with built-in microphone for video calls',
        price: 69.99,
        category: 'Electronics',
        image: 'https://picsum.photos/id/9/400/400',
        stock: 90,
        rating: 4.3,
        numReviews: 156
      },
      {
        name: 'Cotton T-Shirt',
        description: 'Comfortable 100% cotton t-shirt available in multiple colors',
        price: 29.99,
        category: 'Clothing',
        image: 'https://picsum.photos/id/10/400/400',
        stock: 150,
        rating: 4.2,
        numReviews: 60
      },
      {
        name: 'Denim Jeans',
        description: 'Classic blue denim jeans with stretch fabric',
        price: 79.99,
        category: 'Clothing',
        image: 'https://picsum.photos/id/11/400/400',
        stock: 80,
        rating: 4.5,
        numReviews: 110
      },
      {
        name: 'Running Shoes',
        description: 'Lightweight running shoes with cushioned sole',
        price: 119.99,
        category: 'Clothing',
        image: 'https://picsum.photos/id/12/400/400',
        stock: 70,
        rating: 4.6,
        numReviews: 140
      },
      {
        name: 'Zip Hoodie',
        description: 'Soft fleece hoodie with kangaroo pocket',
        price: 59.99,
        category: 'Clothing',
        image: 'https://picsum.photos/id/13/400/400',
        stock: 65,
        rating: 4.4,
        numReviews: 95
      },
      {
        name: 'Winter Jacket',
        description: 'Water-resistant insulated jacket for cold weather',
        price: 149.99,
        category: 'Clothing',
        image: 'https://picsum.photos/id/14/400/400',
        stock: 40,
        rating: 4.7,
        numReviews: 62
      },
      {
        name: 'Casual Sneakers',
        description: 'Everyday sneakers with breathable mesh upper',
        price: 89.99,
        category: 'Clothing',
        image: 'https://picsum.photos/id/15/400/400',
        stock: 85,
        rating: 4.3,
        numReviews: 110
      },
      {
        name: 'The Great Gatsby',
        description: 'A classic American novel by F. Scott Fitzgerald',
        price: 14.99,
        category: 'Books',
        image: 'https://picsum.photos/id/24/400/400',
        stock: 100,
        rating: 4.7,
        numReviews: 300
      },
      {
        name: 'Python Programming',
        description: 'Learn Python programming from scratch to advanced level',
        price: 39.99,
        category: 'Books',
        image: 'https://picsum.photos/id/25/400/400',
        stock: 60,
        rating: 4.4,
        numReviews: 85
      },
      {
        name: 'JavaScript: The Good Parts',
        description: 'Essential guide to JavaScript best practices and patterns',
        price: 29.99,
        category: 'Books',
        image: 'https://picsum.photos/id/26/400/400',
        stock: 75,
        rating: 4.6,
        numReviews: 220
      },
      {
        name: 'Clean Code',
        description: 'A handbook of agile software craftsmanship by Robert C. Martin',
        price: 44.99,
        category: 'Books',
        image: 'https://picsum.photos/id/27/400/400',
        stock: 55,
        rating: 4.9,
        numReviews: 180
      },
      {
        name: 'Web Development Guide',
        description: 'Complete guide to modern web development with React and Node.js',
        price: 49.99,
        category: 'Books',
        image: 'https://picsum.photos/id/28/400/400',
        stock: 50,
        rating: 4.8,
        numReviews: 95
      },
      {
        name: 'Coffee Maker',
        description: 'Programmable coffee maker with thermal carafe',
        price: 89.99,
        category: 'Home',
        image: 'https://picsum.photos/id/30/400/400',
        stock: 40,
        rating: 4.3,
        numReviews: 110
      },
      {
        name: 'Desk Lamp',
        description: 'LED desk lamp with adjustable brightness and color temperature',
        price: 59.99,
        category: 'Home',
        image: 'https://picsum.photos/id/31/400/400',
        stock: 75,
        rating: 4.5,
        numReviews: 130
      },
      {
        name: 'Bed Pillow',
        description: 'Memory foam pillow for optimal neck support',
        price: 79.99,
        category: 'Home',
        image: 'https://picsum.photos/id/32/400/400',
        stock: 120,
        rating: 4.6,
        numReviews: 170
      },
      {
        name: 'Throw Blanket',
        description: 'Cozy knit throw blanket for sofa or bed',
        price: 44.99,
        category: 'Home',
        image: 'https://picsum.photos/id/33/400/400',
        stock: 95,
        rating: 4.5,
        numReviews: 88
      },
      {
        name: 'Ceramic Plant Pot',
        description: 'Decorative ceramic pot with drainage for indoor plants',
        price: 24.99,
        category: 'Home',
        image: 'https://picsum.photos/id/34/400/400',
        stock: 150,
        rating: 4.2,
        numReviews: 45
      },
      {
        name: 'Storage Baskets Set',
        description: 'Set of 3 woven storage baskets for organization',
        price: 39.99,
        category: 'Home',
        image: 'https://picsum.photos/id/35/400/400',
        stock: 60,
        rating: 4.4,
        numReviews: 73
      },
      {
        name: 'Digital Alarm Clock',
        description: 'LED alarm clock with USB charging port',
        price: 29.99,
        category: 'Home',
        image: 'https://picsum.photos/id/36/400/400',
        stock: 80,
        rating: 4.1,
        numReviews: 52
      }
    ];

    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} products created successfully!`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Database connection closed');
  } catch (err) {
    console.error('Error seeding database:', err.message);
    process.exit(1);
  }
};

seedProducts();
