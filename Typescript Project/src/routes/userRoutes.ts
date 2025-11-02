import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controller/userController.ts";

const router = Router();
router.post("/create", createUser);
router.get("/users", getAllUsers);
router.get("/user/:id", getUserById);
router.delete("/user/:id", deleteUser);
router.put("/user/:id", updateUser);

export default router;
