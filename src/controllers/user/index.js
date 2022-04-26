const User = require("../../models/user");

exports.create = (request, response) => {
  if (!request.body) {
    response.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const user = new User({
    ...request.body,
  });
  User.create(user, (err, data) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        response.status(400).send({
          message: "User alreay exists.",
        });
      } else {
        response.status(500).send({
          message:
            err.message || "Some error occurred while creating the User.",
        });
      }
    } else response.send(data);
  });
};

exports.findAll = (request, response) => {
  let email = request.query.email;
  User.getAll(email, (err, data) => {
    if (err){
      if (err.kind === "not_found") {
        response.status(404).send({
          message: `Not found User with id ${email} .`
        });
      } else {
        response.status(500).send({
          message: err.message || "Some error occurred while retrieving users.",
        });
      }
    }
    else response.send(data);
  });
};
