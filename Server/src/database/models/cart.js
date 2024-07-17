module.exports = (db, DataTypes) =>
  db.sequelize.define("cart", {
    cart_id: {
      type: DataTypes.INTEGER(32),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(32),
      allowNull: false,
      references: {
        model: db.user,
        key: "Email"
      }
    },
    quantity: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {
    timestamps: false
  });