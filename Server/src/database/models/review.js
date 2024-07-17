module.exports = (sequelize, DataTypes) =>
  sequelize.define("review", {
    reviewID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    productID: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    comments: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
  }, {
    timestamps: true
  });
