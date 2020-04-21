const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secrets = require("../api/secrets.js");

const TokenGen = require("../api/token-gen.js");
const Users = require("../users/users-model.js");

router.post("/", (req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .then(([found]) => {
      if (found) {
        if (bcrypt.compareSynch(password, found.password)) {
          const token = TokenGen.generateToken(found);
          res.status(200).json({ message: "Welcome", token });
        } else {
          res
            .status(401)
            .json({ message: "Authentication failed. You cannot pass!" });
        }
      } else {
        res.status(400).json({ message: "Username and password required. " });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err.message });
    });
});

module.exports = router;