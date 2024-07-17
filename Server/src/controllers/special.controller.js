const db = require("../database");
const Special = db.special;

exports.all = async (req, res) => {
  try {
    const specials = await Special.findAll({
      include: [{
        model: db.product
      }]
    });
    res.json(specials);
  } catch (error) {
    console.error('Error fetching specials:', error);
    res.status(500).json({ message: error.message });
  }
};