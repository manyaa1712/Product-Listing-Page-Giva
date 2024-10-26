const { Pool } = require('pg'); // Import PostgreSQL client
require('dotenv').config(); // Load environment variables

const pool = new Pool({
    user: process.env.PGUSERNAME,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD, // It's better to use an environment variable
    port: process.env.PGPORT,
});

// Test the connection
pool.connect()
    .then(() => {
        console.log('Connected to PostgreSQL');
    })
    .catch((err) => {
        console.error('Error connecting to PostgreSQL:', err.message);
    });

module.exports = pool; // Export the pool for use in other files
