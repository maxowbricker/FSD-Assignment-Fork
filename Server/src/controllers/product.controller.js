const db = require("../database");
const Product = db.product;
const Special = db.special;

exports.all = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{
        model: Special,
        required: false
      }]
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: error.message });
  }
};