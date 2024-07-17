module.exports = (sequelize, DataTypes) =>
    sequelize.define("order_items", {
      orderDetailID: {
        type: DataTypes.INTEGER(32),
        autoincrement:true,
        allowNull: false,
        primaryKey: true
      },
      orderID: {
        type: DataTypes.INTEGER(10),
        allowNull: false
      },
      productID: {
        type: DataTypes.INTEGER(10,2),
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER(10,2),
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
      },
    }, {
      timestamps: false
    });
  