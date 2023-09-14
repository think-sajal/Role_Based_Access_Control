import { Router } from "express";
import userController from "../controllers/users.controller.js";
import jwtService from "../services/auth.service.js";

const userRoutes = Router();
userRoutes.get("/users", jwtService.authenticate, userController.getUsers);
userRoutes.get("/user/:id", jwtService.authenticate, userController.getUserById);

userRoutes.post("/user", jwtService.authenticate, jwtService.accessRole, userController.createUser);
userRoutes.put("/user/:id", jwtService.authenticate, jwtService.accessRole, userController.updateUser);
userRoutes.delete("/user/:id", jwtService.authenticate, jwtService.accessRole, userController.deleteUserById);
export { userRoutes };
