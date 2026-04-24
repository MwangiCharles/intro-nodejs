import { pool } from '../config/database.js';
import bcrypt from 'bcrypt';

class User {
    // Create a new user
    static async create(userData) {
        const { username, email, password } = userData;
        
        // Hash password before storing
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const [result] = await pool.execute(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );
        return result;
    }

    // Find user by email
    static async findByEmail(email) {
        const [rows] = await pool.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        return rows[0];
    }

    // Find user by username
    static async findByUsername(username) {
        const [rows] = await pool.execute(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );
        return rows[0];
    }

    // Find user by id
    static async findById(id) {
        const [rows] = await pool.execute(
            'SELECT id, username, email, created_at FROM users WHERE id = ?',
            [id]
        );
        return rows[0];
    }
}

export { User };