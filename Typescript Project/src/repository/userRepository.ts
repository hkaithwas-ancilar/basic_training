import pool from "../Database/dbconfig.ts";
import { Logger } from "../utils/logger.ts";

export interface User {
  name: string;
  email: string;
}

export class UserRepository {
  tableName = "users";
  private logger = new Logger("UserRepository");

  // create new user
  async create(user: User) {
    const { name, email } = user;
    this.logger.info(`Creating user: ${name}, ${email}`);

    await pool.query(
      `INSERT INTO ${this.tableName} (name, email) VALUES (?, ?)`, 
      [name, email]
    );

    this.logger.info("User created successfully in DB");
  }

  // Get all users 
  async getAll() {
    this.logger.info("Fetching all users from DB");
    
    const [rows]: any = await pool.query(`SELECT * FROM ${this.tableName}`);

    this.logger.info(`Fetched ${rows.length} users from DB`);
    return rows;
  }

  // Get user by id
  async getById(id: number) {
    this.logger.info(`Fetching user by ID: ${id}`);

    const [rows]: any = await pool.query(
      `SELECT * FROM ${this.tableName} WHERE id = ?`, 
      [id]
    );

    if (!rows.length) {
      this.logger.warn(`User not found in DB for ID ${id}`);
      return null;
    }

    this.logger.info(`User found in DB: ${JSON.stringify(rows[0])}`);
    return rows[0];
  }

  // Update user by ID
  async update(id: number, user: Partial<User>) {
    const { name, email } = user;

    this.logger.info(`Updating user ID ${id} → name=${name}, email=${email}`);

    const [result]: any = await pool.query(
      `UPDATE ${this.tableName} SET name = ?, email = ? WHERE id = ?`,
      [name, email, id]
    );

    if (result.affectedRows === 0) {
      this.logger.warn(`Update failed: User not found (ID ${id})`);
    } else {
      this.logger.info(`User updated successfully in DB (ID ${id})`);
    }

    return result.affectedRows;
  }

  // Delete user by ID
  async delete(id: number) {
    this.logger.info(`Deleting user ID ${id}`);

    const [result]: any = await pool.query(
      `DELETE FROM ${this.tableName} WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      this.logger.warn(`Delete failed: User not found (ID ${id})`);
    } else {
      this.logger.info(`User deleted successfully from DB (ID ${id})`);
    }

    return result.affectedRows;
  }
}
