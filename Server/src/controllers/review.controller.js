const db = require("../database");

// Select all posts from the database.
exports.all = async (req, res) => {


  
  const posts = await db.review.findAll();


  res.json(posts);
};

// Create a post in the database.
exports.create = async (req, res) => {

  const post = await db.review.create({
    comments: req.body.comments,
    productID: "1",
    rating : "4" ,

  });

  res.json(post);


};
