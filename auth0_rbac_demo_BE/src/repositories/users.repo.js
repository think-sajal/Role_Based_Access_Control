import CryptoJS from "crypto-js";
import User from "../models/User.js";
import AuthService from "../services/auth.service.js";

const usersRepo = {
  getUsers: async () => {
    try {
      const users = await User.findAll();
      if (!users.length) {
        return `No users found`;  
      }
      return users
    } catch (error) {
      console.log("Error in retrieving users data", error);
      throw error;
    }
  },

  getUserById: async (id) => {
    try {
      const userData = await User.findOne({ where: { id: id } });
      if (!userData) {
        return `user_id: ${id} | user does not exist`;
      }
      return userData; 
    } catch (error) {
      console.log("Error while getting user details");
      throw error;
    }
  },

  createUser: async (body) => {
    try {
      const { email, c_password } = body;
      const password = CryptoJS.AES.decrypt(c_password, process.env.CRYPTO_SECRET).toString(CryptoJS.enc.Utf8);
      const user = await AuthService.managementClient.createUser({
          connection: "Username-Password-Authentication",
          email,
          password
      });

      if (!user) {
        throw new Error('Failed to create user');
      }

      let roles = [];
      if (body.role === 'Admin') {
        roles.push(process.env.ADMIN_ROLE);
      }

      if (body.role === 'User') {
        roles.push(process.env.USER_ROLE);
      }

      AuthService.managementClient.assignRolestoUser(
        { id: user.user_id },
        { roles }
      );

      // store user in database
      body.id = user.user_id;
      const data = await User.create(body);
      return { status: 'success', data };
    } catch (error) {
      console.log("Error in creating user", error);
      throw error;
    }
  },

  updateUser: async (payload, params) => {
    try {
      const { id } = params;
      id = decodeURIComponent(id);
      await User.update({ ...payload }, { where: { id } });
      return { status: 'success', message: "User details successfully updated" };
    } catch (error) {
      console.log("Error in updating User", error);
      throw error;
    }
  },

  deleteUserById: async (id) => {
    id = decodeURIComponent(id);
    try {
      await User.destroy({ where: { id }});
      await AuthService.managementClient.deleteUser({ id });
      return { status: 'success', message: "User deleted successfully" };
    } catch (error) {
      console.log("Error while deleting user", error);
      throw error;
    }
  },
};

export default usersRepo;
