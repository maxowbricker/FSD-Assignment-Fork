module.exports = (express, app) => {
    const controller = require("../controllers/special.controller.js");
    const router = express.Router();
  
    // Select all specials.
    router.get("/", controller.all);
  
    // Add routes to server.
    app.use("/api/specials", router);
  };  