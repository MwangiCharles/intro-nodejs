import { createPool } from 'mysql2/promise';

const pool = createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'farm',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const connectDB = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ MySQL database connected successfully');
        connection.release();
        return pool;
    } catch (error) {
        console.error('❌ MySQL connection failed:', error.message);
        throw error;
    }
};

export { pool, connectDB };
export default connectDB;