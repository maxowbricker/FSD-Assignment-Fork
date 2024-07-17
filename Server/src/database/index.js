const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op
};

// Create Sequelize instance.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.product = require("./models/product.js")(db.sequelize, DataTypes);
db.special = require("./models/special.js")(db.sequelize, DataTypes);
db.cart = require("./models/cart.js")(db, DataTypes);
db.order_items = require("./models/order_items.js")(db.sequelize, DataTypes);
db.orders = require("./models/orders.js")(db.sequelize, DataTypes);
db.review = require("./models/review.js")(db.sequelize, DataTypes);
db.cart_product = require("./models/cart_product.js")(db.sequelize, DataTypes);

// // Add Associations:
db.product.hasOne(db.special, { foreignKey: 'productID' });
db.special.belongsTo(db.product, { foreignKey: 'productID' });

// // USER and REVIEWS
// db.user.hasMany(db.reviews, { foreignKey: 'email' });
// db.reviews.belongsTo(db.user, { foreignKey: 'email' });

// USER and ORDERS
db.user.hasMany(db.orders, { foreignKey: 'email' });
db.orders.belongsTo(db.user, { foreignKey: 'email' });

// USER and CART
db.user.hasOne(db.cart, { foreignKey: 'email' });
db.cart.belongsTo(db.user, { foreignKey: 'email' });

// // REVIEWS and PRODUCT
// db.product.hasMany(db.reviews, { foreignKey: 'productID' });
// db.reviews.belongsTo(db.product, { foreignKey: 'productID' });

// CART and PRODUCT through CartProduct join table
db.cart.belongsToMany(db.product, { through: db.cart_product, foreignKey: 'cart_id' });
db.product.belongsToMany(db.cart, { through: db.cart_product, foreignKey: 'productID' });

// ORDERS and ORDER_ITEMS
db.orders.hasMany(db.order_items, { foreignKey: 'orderID' });
db.order_items.belongsTo(db.orders, { foreignKey: 'orderID' });

// PRODUCT and ORDER_ITEMS
db.product.hasMany(db.order_items, { foreignKey: 'productID' });
db.order_items.belongsTo(db.product, { foreignKey: 'productID' });


// Sync and seed data if necessary.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync({ force: true }); // Use { force: true } if you want to reset the database

  // Seed data if necessary.
  await seedData();
};

async function seedData() {
  const userCount = await db.user.count();
  const productCount = await db.product.count();

  // Seed users
  if (userCount === 0) {
    const argon2 = require("argon2");

    let hash = await argon2.hash("abc123", { type: argon2.argon2id });
    await db.user.create({ email: "mbolger", password_hash: hash, fullname: "Matthew Singleton" });

    hash = await argon2.hash("def456", { type: argon2.argon2id });
    await db.user.create({ email: "shekhar", password_hash: hash, fullname: "Shekhar Test" });
  }

  // Seed products and specials
  if (productCount === 0) {
    const products = [
      { productName: "Carrots", category: "Vegetable", price: 13.20, stockQuantity: 100, description: "Fresh organic carrots" },
      { productName: "Broccoli", category: "Vegetable", price: 8.50, stockQuantity: 50, description: "Fresh organic broccoli" },
      { productName: "Tomatoes", category: "Vegetable", price: 9.99, stockQuantity: 80, description: "Fresh organic tomatoes" },
      { productName: "Spinach", category: "Vegetable", price: 7.25, stockQuantity: 60, description: "Fresh organic spinach" },
      { productName: "Apples", category: "Fruit", price: 6.00, stockQuantity: 120, description: "Fresh organic apples" },
      { productName: "Bananas", category: "Fruit", price: 4.99, stockQuantity: 150, description: "Fresh organic bananas" },
      { productName: "Radish", category: "Vegetable", price: 3.50, stockQuantity: 70, description: "Fresh organic radish" },
      { productName: "Cucumbers", category: "Vegetable", price: 5.75, stockQuantity: 90, description: "Fresh organic cucumbers" },
      { productName: "Beetroot", category: "Vegetable", price: 4.20, stockQuantity: 60, description: "Fresh organic beetroot" },
      { productName: "Turnips", category: "Vegetable", price: 3.80, stockQuantity: 50, description: "Fresh organic turnips" },
      { productName: "Beans", category: "Vegetable", price: 6.50, stockQuantity: 110, description: "Fresh organic beans" },
      { productName: "Rocket", category: "Vegetable", price: 5.30, stockQuantity: 40, description: "Fresh organic rocket" },
      { productName: "Bok Choy", category: "Vegetable", price: 4.80, stockQuantity: 50, description: "Fresh organic bok choy" },
      { productName: "Lettuce", category: "Vegetable", price: 5.00, stockQuantity: 70, description: "Fresh organic lettuce" },
      { productName: "Zucchini", category: "Vegetable", price: 4.75, stockQuantity: 90, description: "Fresh organic zucchini" },
      { productName: "Snow Peas", category: "Vegetable", price: 6.20, stockQuantity: 60, description: "Fresh organic snow peas" },
      { productName: "Green Onions", category: "Vegetable", price: 3.99, stockQuantity: 80, description: "Fresh organic green onions" },
      { productName: "Kale", category: "Vegetable", price: 5.50, stockQuantity: 100, description: "Fresh organic kale" }
    ];

    const createdProducts = await db.product.bulkCreate(products);

    const specials = [
      { productID: 1, originalPrice: 15.50, specialPrice: 13.20 },  // Carrots
      { productID: 2, originalPrice: 10.75, specialPrice: 8.50 },   // Broccoli
      { productID: 3, originalPrice: 12.20, specialPrice: 9.99 },   // Tomatoes
      { productID: 4, originalPrice: 8.99, specialPrice: 7.25 },    // Spinach
      { productID: 5, originalPrice: 7.50, specialPrice: 6.00 },    // Apples
      { productID: 6, originalPrice: 6.25, specialPrice: 4.99 }     // Bananas
    ];

    await db.special.bulkCreate(specials);
  }
}

module.exports = db;