module.exports = (sequelize, DataTypes) =>
    sequelize.define("orders", {
      orderID: {
        type: DataTypes.INTEGER(32),
        autoincrement:true,
        allowNull: false,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING(200),
        primaryKey:true,
        allowNull: false
      },
      totalAmount: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
      },
    }, {
      timestamps: false
    });
  