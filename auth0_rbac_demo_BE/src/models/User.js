import Sequelize, { Model } from "sequelize";

class User extends Model {
  static init(sequelize) {
    super
      .init(
        {
          id: {
            type: Sequelize.STRING,
            primaryKey: true,
          },
          first_name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
              notNull: { msg: "First name is required" },
            },
          },
          last_name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
              notNull: { msg: "Last name is required" },
            },
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
              notNull: { msg: "Email is required" },
            },
          },
          role: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
              notNull: { msg: "Role is required" },
            },
          },
          phone: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
              notNull: { msg: "Phone number is required" },
            },
          },
          address_lane_one: Sequelize.STRING,
          address_lane_two: Sequelize.STRING,
          city: Sequelize.STRING,
          state: Sequelize.STRING,
          zip: Sequelize.STRING,
          designation: Sequelize.STRING,
          experience: Sequelize.STRING,
        },
        {
          sequelize,
          timestamps: true,
        }
      )
      .sync();
    return this;
  }
}

export default User;
