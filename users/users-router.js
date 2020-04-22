const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Users = require("./users-model.js");

router.get("/", (req, res) => {
  const department = jwt.decode(req.headers.authorization).department;
  Users.findBy({department: department})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.send(err));
});

module.exports = router;
