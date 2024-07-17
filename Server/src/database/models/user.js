module.exports = (sequelize, DataTypes) =>
  sequelize.define("user", {
    email: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    password_hash: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    fullname: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
  }, {
    timestamps: true
  });
