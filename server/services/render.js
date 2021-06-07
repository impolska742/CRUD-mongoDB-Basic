const axios = require("axios");
const appUrl = "https://calm-headland-70598.herokuapp.com";
exports.homeRoutes = (req, res) => {
  // Make a get request to /api/users
  axios
    .get(appUrl + "/api/users")
    .then((response) => {
      res.render("index", {
        users: response.data,
      });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.addUser = (req, res) => {
  axios.post(appUrl + "/api/users");
  res.render("add_user");
};

exports.updateUser = (req, res) => {
  axios
    .get(appUrl + "/api/users", { params: { id: req.query.id } })
    .then(function (userdata) {
      res.render("update_user", { user: userdata.data });
    })
    .catch((err) => {
      res.send(err);
    });
};
