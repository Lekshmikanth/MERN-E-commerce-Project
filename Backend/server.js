// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const cartRoutes = require('./routes/cart');
const config = require('./config');
const path = require('path');

const app = express();

// CORS middleware to allow requests from the frontend (localhost:3000)
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your frontend
    methods: 'GET,POST,PUT,DELETE',
    credentials: true, // Allow sending cookies (session)
}));

// Body parser middleware
app.use(bodyParser.json());

// Session middleware
app.use(
    session({
        secret: 'ecommerce', // Use a secret key
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Set `secure: true` if you're using HTTPS
    })
);

// MongoDB connection
mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
