module.exports = (express, app) => {
  const router = express.Router();
  const cartController = require("../controllers/cart.controller.js");

  // Routes for managing the cart of a user by email
  // Fetch the cart for a user
  router.get("/cart/:email", cartController.viewCart);

  // Add or update a product in the cart
  // Since you are using the update to both add (if not exists) and modify (if exists),
  // this can be combined into a single PUT endpoint if you decide to eliminate the addProductToCart method
  router.put("/cart/:email/product", cartController.updateProductQuantity);

  router.delete('/checkout/:email', cartController.clearCart);


  app.use("/api", router);

}