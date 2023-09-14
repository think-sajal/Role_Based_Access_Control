import usersRepo from "../repositories/users.repo.js";

const userController = {
  getUsers: async (req, res) => {
    usersRepo
      .getUsers()
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.send({ statusCode: err.statusCode, status: 'error', error: err, message: err.message });
      });
  },

  getUserById: async (req, res) => {
    const { id } = req.params;
    usersRepo
      .getUserById(id)
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.send({ statusCode: err.statusCode, status: 'error', error: err, message: err.message });
      });
  },

  createUser: async (req, res) => {
    await usersRepo
      .createUser(req.body)
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.send({ statusCode: err.statusCode, status: 'error', error: err, message: err.message });
      });
  },

  updateUser: async (req, res) => {
    await usersRepo
      .updateUser(req.body,req.params)
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.send({ statusCode: err.statusCode, status: 'error', error: err, message: err.message });
      });
  },

  deleteUserById: async (req, res) => {
    const { id } = req.params;
    await usersRepo
      .deleteUserById(id)
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.send({ statusCode: err.statusCode, status: 'error', error: err, message: err.message });
      });
  },
};

export default userController;
