module.exports = (sequelize, DataTypes) => {
    const Special = sequelize.define('special', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      productID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'productID'
        },
        foreignKey: true
      },
      originalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      specialPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
    }, {
      timestamps: true
    });
    return Special;
  };
  