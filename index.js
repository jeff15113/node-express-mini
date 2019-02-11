// implement your API here

const express = require("express");

const db = require("./data/db.js");

const server = express();

const port = 3333;

server.use(express.json());

server.post("/pi/users", (req, res) => {
  const hub = req.body;

  db.hubs
    .add(hub)
    .then(hub => {
      res.status(201).json({ success: true, hub });
    })
    .catch(({ code, message }) => {
      res.status(code).json({ success: false, message });
    });
});

server.listen(port, () => {
  console.log(`\n*** Running on port ${port} ***\n`);
});
