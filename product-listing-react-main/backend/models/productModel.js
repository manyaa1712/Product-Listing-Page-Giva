const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://<username>:<your_password>@localhost:5432/<databasename>', {
  dialect: 'postgres',
});

// Define the Product model
const Product = sequelize.define('Product', {
  title: {
    type: DataTypes.STRING,
    allowNull: false, // Required
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false, // Required
  },
  price: {
    type: DataTypes.FLOAT, // Use FLOAT for decimal values
    allowNull: false, // Required
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false, // Required
  },
});

// Sync the model with the database (this will create the table if it doesn't exist)
const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log('Product model synced with the database.');
  } catch (error) {
    console.error('Error syncing the database:', error);
  }
};

syncDatabase();

module.exports = Product;
