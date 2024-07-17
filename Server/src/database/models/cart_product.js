module.exports = (sequelize, DataTypes) => 
  sequelize.define("cart_product", {
    cart_product_id: {
      type: DataTypes.INTEGER(32),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    cart_id: {
      type: DataTypes.INTEGER(32),
      allowNull: false,
      references: {
        model: 'carts',
        key: "cart_id"
      }
    },
    productID: {
      type: DataTypes.INTEGER(32),
      allowNull: false,
      references: {
        model: 'products',
        key: "ProductID"
      }
    },
    quantity: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {
    timestamps: false
  });