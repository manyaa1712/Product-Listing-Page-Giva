const express = require('express');
// const { Pool } = require('pg'); // Import PostgreSQL client
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config(); // Load environment variables from .env

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Welcome to Listing Product Backend");
});


// // Test the connection
// pool.connect()
//     .then(() => {
//         console.log('Connected to PostgreSQL');
//     })
//     .catch((err) => {
//         console.error('Error connecting to PostgreSQL:', err.message);
//     });

// Use the product routes
app.use('/api', productRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
