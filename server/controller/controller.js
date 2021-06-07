var userDB = require("../model/model");

// Create and save new user

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  // new User creation
  const user = new userDB({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  // Save user in the database
  user
    .save(user)
    .then((data) => {
      //   res.send(data);
      res.redirect("/add-user");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some Error Occurred while creating a create operation",
      });
    });
};

// Retrive and return all users/ retrive and return a single user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    userDB
      .findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `User not found with id ${id}`,
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving user with id " + id,
        });
      });
  } else {
    userDB
      .find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error occurred while retriving user information",
        });
      });
  }
};

// Update a new identified user by userID
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty",
    });
  }

  const id = req.params.id;
  userDB
    .findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with ${id}. Maybe User not found!!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error Update user information",
      });
    });
};

// Delete a user with specified userID
exports.delete = (req, res) => {
  const id = req.params.id;

  userDB
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete with id ${id}. Maybe ID is wrong`,
        });
      } else {
        res.send({
          message: "User was deleted successfully.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id = " + id,
      });
    });
};
