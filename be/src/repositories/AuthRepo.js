import db from '../models/db.js';

export const findUserByCredentials = async (username, password) => {
    // Return the query promise directly
    const query = "SELECT * FROM users WHERE username = ? AND password = ?";
    const [rows] = await db.query(query, [username, password]);
    
    // Return the user object if found, or null
    return rows.length > 0 ? rows[0] : null;
};

export const createUser = async (username, password, email) => {
    const query = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
    const [result] = await db.query(query, [username, password, email]);
    
    // Return the new ID
    return result.insertId;
};