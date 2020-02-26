require("dotenv").config();

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./data/user-model.js");
const { jwtSecret } = require("./config/jwtConfig.js");

const server = express();
const port = 5000;
server.use(express.json());

server.post("/register", async (req, res) => {
  const { username, password, department } = req.body;
  try {
    const hashed = bcrypt.hashSync(password, 12);
    const user = await db.insert({ username, department, password: hashed });
    res.status(201).json({
      username: user.username,
      department: user.department,
      id: user.id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

server.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db.findBy({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ msg: `welcome, ${user.username}`, token });
    } else {
      res.status(401).json({ msg: "invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

function generateToken(user) {
  const { username, department } = user;
  const payload = { username, department };
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, jwtSecret, options);
}

server.listen(port, () => console.log(`server is listening on port ${port}`));
