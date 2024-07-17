module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('product', {
      productID: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true
      },
      productName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      stockQuantity: {
        type: DataTypes.INTEGER(10),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
    }, {
      timestamps: true
    });
  
    return Product;
  }; 