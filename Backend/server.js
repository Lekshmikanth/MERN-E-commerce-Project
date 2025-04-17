const express = require('express');
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const userRoutes = require('./routes/user');
const cartRoutes = require('./routes/cart');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const config = require('./config');
const path = require('path');

const app = express();
mongoose.set('strictQuery', true);

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
}));
app.use(bodyParser.json());
app.use(session({
    secret: 'ecommerce',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB and start server
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB connected ✅');

        const bucket = new GridFSBucket(mongoose.connection.db, {
            bucketName: 'productImages',
        });

        // Require productRoutes here and pass bucket
        const productRoutes = require('./routes/product')(bucket);
        const categoryRoutes = require('./routes/category')(bucket);

        // Register routes
        app.use('/api/products', productRoutes);
        app.use('/api/users', userRoutes);
        app.use('/api/cart', cartRoutes);
        app.use('/api/categories', categoryRoutes);
        app.use('/api/orders', orderRoutes);

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
