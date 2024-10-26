const pool = require('../db'); // Import the PostgreSQL pool connection

const createProduct = async (req, res) => {
  try {
    const { title, description, price, imageUrl } = req.body;
    const result = await pool.query(
      'INSERT INTO products (title, description, price, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, price, imageUrl]
    );
    const product = result.rows[0]; // Get the inserted product from the result
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Error creating product' });
  }
};

const getProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    const products = result.rows; // Get the list of products from the result
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { title, description, price, imageUrl } = req.body;
    const productId = req.params.id;

    const result = await pool.query('SELECT * FROM products WHERE id = $1', [productId]);
    const product = result.rows[0];

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update the product in the database
    const updatedProduct = await pool.query(
      'UPDATE products SET title = $1, description = $2, price = $3, image_url = $4 WHERE id = $5 RETURNING *',
      [title, description, price, imageUrl, productId]
    );

    res.json(updatedProduct.rows[0]);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Error updating product' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [productId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Error deleting product' });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [productId]);
    const product = result.rows[0];

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Error fetching product' });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};

