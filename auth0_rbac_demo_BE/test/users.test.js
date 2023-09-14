import AuthService from "../src/services/auth.service.js";
import User from "../src/models/User.js";
import usersRepo from "../src/repositories/users.repo.js";

// Mock AuthService.managementClient.createUser function
jest.mock("../src/services/auth.service.js", () => ({
  managementClient: {
    createUser: jest.fn(),
    assignRolestoUser: jest.fn(),
    deleteUser: jest.fn(),
  },
}));

// Mock User.create function
jest.mock("../src/models/User.js", () => ({
  create: jest.fn(),
}));

// Mock crypto js
jest.mock("crypto-js", () => ({
  AES: {
    decrypt: jest.fn().mockReturnThis(),
  },
  toString: jest.fn(() => "password"),
  enc: { Utf8: "utf-8" },
}));

describe("createUser", () => {
  console.log = jest.fn();
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create a user and assign role correctly", async () => {
    const body = {
      email: "test@example.com",
      c_password: "eYcWqXdBYEMPqkXGKdKBWO93jCIdRn4WLvAur/wew0s=",
      role: "Admin",
    };

    // Mock AuthService.managementClient.createUser function
    AuthService.managementClient.createUser.mockResolvedValue({
      user_id: "user123",
    });

    // Mock User.create function
    User.create.mockResolvedValue({
      id: "user123",
      email: "test@example.com",
      role: "Admin",
    });

    const result = await usersRepo.createUser(body);
    expect(AuthService.managementClient.createUser).toHaveBeenCalledWith({
      connection: "Username-Password-Authentication",
      email: "test@example.com",
      password: expect.any(String),
    });

    expect(AuthService.managementClient.assignRolestoUser).toHaveBeenCalledWith(
      { id: "user123" },
      { roles: [process.env.ADMIN_ROLE] }
    );

    expect(result).toEqual({
      status: "success",
      data: {
        id: "user123",
        email: "test@example.com",
        role: "Admin",
      },
    });
  });

  test("should return a list of user", async () => {
    User.findAll = jest.fn().mockResolvedValue([
      {
        id: "user123",
        email: "test@example.com",
        role: "Admin",
      },
      {
        id: "user123",
        email: "test@example.com",
        role: "Admin",
      },
    ]);
    const result = await usersRepo.getUsers();
    expect(result.length).toBeGreaterThanOrEqual(2);
  });

  test("should return an user", async () => {
    User.findOne = jest.fn().mockResolvedValue({
        id: "user123",
        email: "test@example.com",
        role: "Admin"
    });

    const result = await usersRepo.getUserById('user123');
    expect(result).toEqual({ id: 'user123', email: 'test@example.com', role: 'Admin' });
  });

  test("should update an existing user with new data", async () => {
    const userId = "user123";
    const updateData = { email: "test@example.com" };
    User.update = jest.fn().mockResolvedValue([1]);
    const result = await usersRepo.updateUser(updateData, userId);
    expect(result).toEqual({
      status: "success",
      message: "User details successfully updated",
    });
  });

  test("should delete an existing user", async () => {
    const userId = "user123";
    User.destroy = jest.fn().mockResolvedValue(1);
    const result = await usersRepo.deleteUserById(userId);
    expect(result).toEqual({ status: 'success', message: "User deleted successfully" });
  });
});
