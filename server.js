const express = require("express");
const server = express();
const port = 5000;

server.get("/", (req, res) => {
  res.send("hello world");
});

server.listen(port, () => console.log(`server is listening on port ${port}`));
