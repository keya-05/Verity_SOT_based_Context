import logger from '../utils/logger.js';
import { findUserByCredentials, createUser } from '../repositories/AuthRepo.js'; 

export const Login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await findUserByCredentials(username, password);

        if (user) {
            logger.info(`User ${username} logged in as ${user.role}`);
            return res.status(200).json({ 
                message: "Login Successful", 
                user: {
                    id: user._id,
                    username: user.username,
                    role: user.role // Frontend uses this to redirect to /admin or /dashboard
                } 
            });
        } else {
            logger.warn(`Failed login attempt for ${username}`);
            return res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        logger.error(error, "Login Error");
        return res.status(500).json({ message: "Server Error" });
    }
};

export const Register = async (req, res) => {
    try {
        const { username, password, email, role } = req.body;

        // Pass role to creator (defaults to 'user' if not provided)
        const userId = await createUser(username, password, email, role);

        logger.info(`New user registered: ${username}`);
        return res.status(201).json({ 
            message: "User Registered Successfully", 
            userId 
        });

    } catch (error) {
        // MongoDB duplicate key error code is 11000
        if (error.code === 11000) {
            return res.status(409).json({ message: "Username or Email already exists" });
        }
        logger.error(error, "Registration Error");
        return res.status(500).json({ message: "Server Error" });
    }
};