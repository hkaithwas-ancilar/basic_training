import type { Request, Response } from "express";
import { UserRepository } from "../repository/UserRepository.ts";
import { Logger } from "../utils/logger.ts";

const logger = new Logger("UserController");
const userRepo = new UserRepository();

// Create user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email } = req.body;

    logger.info(`Creating user: ${name}, ${email}`);
    await userRepo.create({ name, email });

    logger.info("User created successfully");
    res.json({ message: "User created" });
  } catch (error: any) {
    logger.error("Error creating user", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    logger.info("Fetching all users");
    const users = await userRepo.getAll();

    logger.info(`Fetched ${users.length} users`);
    res.json(users);
  } catch (error: any) {
    logger.error("Error fetching users", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    logger.info(`Fetching user with id = ${id}`);

    const user = await userRepo.getById(id);

    if (!user) {
      logger.warn(`User not found: ID ${id}`);
      res.status(404).json({ message: "User not found" });
      return;
    }

    logger.info(`User found: ${JSON.stringify(user)}`);
    res.json(user);
  } catch (error: any) {
    logger.error("Error fetching user", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    logger.info(`Deleting user with id = ${id}`);

    const affected = await userRepo.delete(id);

    if (affected === 0) {
      logger.warn(`Delete failed - User not found: ID ${id}`);
      res.status(404).json({ message: "User not found" });
      return;
    }

    logger.info(`User deleted: ID ${id}`);
    res.json({ message: "User deleted successfully" });
  } catch (error: any) {
    logger.error("Error deleting user", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update user
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { name, email } = req.body;

    logger.info(`Updating user ID ${id} to Name: ${name}, Email: ${email}`);

    const affected = await userRepo.update(id, { name, email });

    if (affected === 0) {
      logger.warn(`Update failed - User not found: ID ${id}`);
      res.status(404).json({ message: "User not found" });
      return;
    }

    logger.info(`User updated successfully: ID ${id}`);
    res.json({ message: "User updated successfully" });
  } catch (error: any) {
    logger.error("Error updating user", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
