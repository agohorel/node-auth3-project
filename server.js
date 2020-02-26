const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./data/user-model.js");

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
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

server.listen(port, () => console.log(`server is listening on port ${port}`));
