const db = require("../database"); // Database access
const Cart = db.cart; // Cart model
const CartProduct = db.cart_product; // CartProduct model
const Product = db.product; // Product model
const sequelize = db.sequelize;

// View cart for a user
exports.viewCart = async (req, res) => {
  const { email } = req.params;

  try {
    let cart = await Cart.findOne({
      where: { email },
      include: [{
        model: Product,
        through: {
          attributes: ['quantity', 'price']
        }
      }]
    });

    // If cart does not exist, create a new empty cart
    if (!cart) {
      cart = await Cart.create({
        email: email,
        quantity: 0,
        total_amount: 0.00
      });
    }

    res.status(200).send({ cart });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateProductQuantity = async (req, res) => {
  const { email } = req.params;
  const { productID, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ where: { email } });
    if (!cart) {
      cart = await Cart.create({ email, quantity: 0, total_amount: 0.00 });
    }

    const productDetails = await Product.findByPk(productID);
    if (!productDetails) {
      return res.status(404).send({ message: "Product not found" });
    }

    let cartProduct = await CartProduct.findOne({
      where: { cart_id: cart.cart_id, productID }
    });

    if (!cartProduct) {
      if (quantity > 0) {  // Ensure that we only create a new cart product if the quantity is more than 0.
        cartProduct = await CartProduct.create({
          cart_id: cart.cart_id,
          productID,
          quantity,
          price: productDetails.price
        });
        cart.total_amount = parseFloat(cart.total_amount) + (quantity * parseFloat(productDetails.price));
      }
    } else {
      if (quantity < 1) {
        cart.total_amount -= (cartProduct.quantity * cartProduct.price);
        await cartProduct.destroy();  // Delete the cart product if quantity is less than 1
      } else {
        const newTotal = quantity * productDetails.price;
        cart.total_amount = parseFloat(cart.total_amount) - (cartProduct.quantity * cartProduct.price) + newTotal;

        cartProduct.quantity = quantity;
        cartProduct.price = productDetails.price;  // Update with the unit price
        await cartProduct.save();
      }
    }

    const totalItems = await CartProduct.sum('quantity', { where: { cart_id: cart.cart_id } });
    cart.quantity = totalItems;
    await cart.save();

    res.status(200).send({ message: "Product quantity updated successfully", cartProduct });
  } catch (err) {
    console.error("Error in updating cart:", err);
    res.status(500).send({ message: err.message });
  }
};

exports.clearCart = async (req, res) => {
  const { email } = req.params;
  let transaction;

  try {
    // Start transaction
    transaction = await db.sequelize.transaction();

    // Retrieve the cart associated with the email
    const cart = await Cart.findOne({
      where: { email: email }
    }, { transaction });

    if (!cart) {
      await transaction.rollback();
      return res.status(404).send({ message: "Cart not found" });
    }

    // Clear the user's cart
    await CartProduct.destroy({
      where: { cart_id: cart.cart_id }
    }, { transaction });

    await cart.update({ total_amount: 0, quantity: 0 }, { transaction });

    // Commit the transaction if all operations are successful
    await transaction.commit();
    res.send({ message: "Cart cleared successfully" });
  } catch (error) {
    // Rollback the transaction in case of an error
    if (transaction) await transaction.rollback();
    res.status(500).send({ message: error.message || "Error finalizing checkout." });
  }
};