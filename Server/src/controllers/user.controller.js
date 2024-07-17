const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();

  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const email = req.params.email;
  console.log(email);
  const user = await db.user.findByPk(email);

  res.json(user);
};


// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
  const user = await db.user.findByPk(req.query.email);
  console.log(req.query.email);

  if (!user) {
    // User not found.
    console.log("User not found");
    res.json(null);
    return;
  }

  // Verify the password.
  const verifyResult = await argon2.verify(user.password_hash, req.query.password);

  if (!verifyResult) {
    // Password verification failed.
    console.log("Pass failed");
    res.json(null);
  } else {
    // Login successful.
    console.log("Login successful");
    res.json(user);
  }
};

// Create a user in the database.
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
  
  const user = await db.user.create({
    email: req.body.email,
    password_hash: hash,
    fullname: req.body.fullname,
  });

  res.json(user);
}


 // Update a profile in the database.
 exports.update = async (req, res) => {
  const email = req.params.email;
  console.log(email)
  const user = await db.user.findByPk(email);


  console.log("user", user)
  console.log(req.body)
  user.fullname = req.body.fullname;
  
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
  user.password_hash = hash

  await user.save();

  return res.json(user);
};
  
exports.remove = async (req, res) => {
  const email = req.params.email;
  let removed = false;

  const user = await db.user.findByPk(email);

  if(user !== null) {

    await user.destroy();
    removed = true;
  }

  return res.json(removed);
};

