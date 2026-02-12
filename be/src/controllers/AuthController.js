import logger from '../utils/logger.js';
// Import the repo functions we just made
import { findUserByCredentials, createUser } from '../repositories/AuthRepo.js'; 

export const Login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Call Repository to get data
        const user = await findUserByCredentials(username, password);

        // 2. Decide response based on data
        if (user) {
            logger.info(`User ${username} logged in`);
            return res.status(200).json({ 
                message: "Login Successful", 
                user 
            });
        } else {
            logger.warn(`Failed login attempt for ${username}`);
            return res.status(401).json({ 
                message: "Invalid credentials" 
            });
        }
    } catch (error) {
        logger.error(error, "Login Error");
        return res.status(500).json({ message: "Server Error" });
    }
};

export const Register = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // 1. Call Repository
        const userId = await createUser(username, password, email);

        // 2. Send Success
        logger.info(`New user registered: ${username}`);
        return res.status(201).json({ 
            message: "User Registered Successfully", 
            userId 
        });

    } catch (error) {
        // Handle duplicate entry error (e.g., username already exists)
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: "Username or Email already exists" });
        }
        logger.error(error, "Registration Error");
        return res.status(500).json({ message: "Server Error" });
    }
};