module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

  // Select all users.
  router.get("/", controller.all);

   // Select one user from the database if username and password are a match.
 router.get("/login", controller.login);

  // Select a single user with id.
  router.get("/:email", controller.one);

  // Create a new user.
  router.post("/", controller.create);

  // Update a user with id.
  router.put("/:email", controller.update);

   // Delete a user with id.
  router.delete("/:email", controller.remove);

  // Add routes to server.
  app.use("/api/users", router);


  


  
};
