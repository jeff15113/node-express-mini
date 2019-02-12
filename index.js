// implement your API here

const express = require("express");

const db = require("./data/db.js");

const server = express();

const port = 3333;

server.use(express.json());

server.post("/api/users", (req, res) => {
  const { name, bio, created_at, updated_at } = req.body;
  if (!name || !bio) {
    res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    });
    return;
  }
  db.insert({
    name,
    bio,
    created_at,
    updated_at
  })
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({
        error: "There was an error while saving the user to the database"
      });
      return;
    });
});

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.json({ users });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The users information could not be retrieved."
      });
      return;
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(users => {
      if (user.length === 0) {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
        return;
      }
      res.json({ users });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The users information could not be retrieved."
      });
      return;
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(response => {
      if (response === 0) {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
        return;
      }
      res.json({ success: `User ${id} removed.` });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The user could not be removed"
      });
      return;
    });
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  if (!name || !bio) {
    res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    });
    return;
  }
  db.update(id, { name, bio })
    .then(response => {
      if (response == 0) {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
        return;
      }
      db.findById(id)
        .then(user => {
          if (user.length === 0) {
            res.status(404).json({
              errorMessage: "The user with the specified ID does not exist."
            });
            return;
          }
          res.json(user);
        })
        .catch(error => {
          console.log(error);
          res
            .status(500)
            .jason({ error: "The user information could not be modified." });
        });
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The user information could not be modified." });
      return;
    });
});

server.listen(port, () => {
  console.log(`\n*** Running on port ${port} ***\n`);
});
