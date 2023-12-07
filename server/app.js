const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes'); 
const addProductRoutes = require('./routes/addProductRoutes');
const addressRoutes = require('./routes/addressRoutes');
const forgotRoutes = require('./routes/forgotRoutes');
const searchRoutes = require('./routes/searchRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'Ecommerce-mvc';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection opened');
  // Perform a test operation here
});

// Serve uploaded images
app.use('/api/uploads', express.static('uploads'));

// Use the auth routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Use the product routes
app.use('/api', productRoutes);

// Use the add product routes
app.use('/api', addProductRoutes);

// Use the address routes
app.use('/api', addressRoutes);

// Use the forgot password routes
app.use('/api', forgotRoutes);
app.use('/api/search', searchRoutes);

// use the Contact us
app.use('/contact', contactRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
