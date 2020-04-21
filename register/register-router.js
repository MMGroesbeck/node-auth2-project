const router = require("express").Router();
const bcrypt = require("bcryptjs");

const TokenGen = require("../api/token-gen.js");
const Users = require("../users/users-model.js");

router.post("/", (req, res) => {
  let user = req.body;
  const salter = process.env.HASH_ROUNDS || 14;
  const pwHash = bcrypt.hashSync(user.password, salter);
  user.password = pwHash;
  Users.add(user)
    .then((saved) => {
        const token = TokenGen.generateToken(saved);
      res.status(201).json({ message: "Welcome", token });
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: err.message });
    });
});

module.exports = router;

