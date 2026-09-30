import { pool } from '../config/database.js';

class Post {
    // Create a new post
    static async create(postData) {
        const { name, description, age } = postData;
        
        const [result] = await pool.execute(
            'INSERT INTO posts (name, description, age) VALUES (?, ?, ?)',
            [name, description, age]
        );
        return result;
    }

    // Get all posts
    static async findAll() {
        const [rows] = await pool.execute(
            'SELECT * FROM posts ORDER BY created_at DESC'
        );
        return rows;
    }

    // Get post by id
    static async findById(id) {
        const [rows] = await pool.execute(
            'SELECT * FROM posts WHERE id = ?',
            [id]
        );
        return rows[0];
    }

    // Get posts by name
    static async findByName(name) {
        const [rows] = await pool.execute(
            'SELECT * FROM posts WHERE name LIKE ?',
            [`%${name}%`]
        );
        return rows;
    }

    // Get posts by age range
    static async findByAgeRange(minAge, maxAge) {
        const [rows] = await pool.execute(
            'SELECT * FROM posts WHERE age BETWEEN ? AND ?',
            [minAge, maxAge]
        );
        return rows;
    }

    // Update post
    static async update(id, postData) {
        const { name, description, age } = postData;
        const [result] = await pool.execute(
            'UPDATE posts SET name = ?, description = ?, age = ? WHERE id = ?',
            [name, description, age, id]
        );
        return result;
    }

    // Delete post
    static async delete(id) {
        const [result] = await pool.execute(
            'DELETE FROM posts WHERE id = ?',
            [id]
        );
        return result;
    }

    // Get post count
    static async getCount() {
        const [rows] = await pool.execute(
            'SELECT COUNT(*) as count FROM posts'
        );
        return rows[0].count;
    }
}

export { Post };