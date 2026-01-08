import mysql from 'mysql2/promise'; // Use the promise version
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Test the connection
pool.getConnection()
    .then(connection => {
        console.log("DB Connected successfully");
        connection.release();
    })
    .catch(err => {
        console.error("DB Connection Error:", err);
    });

export default pool;