import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/models/db.js'; 
import authRoutes from './src/routes/AuthRoutes.js';
import fileRoutes from './src/routes/FileRoutes.js';
import logger from './src/utils/logger.js';

dotenv.config();

const app = express();

// 1. Connect to MongoDB
connectDB();

// 2. Middleware
app.use(cors()); // Allows your React frontend to talk to this backend
app.use(express.json()); // Allows the backend to read JSON from requests

// 3. Routes
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes); 

// 4. Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    logger.info(`Server started on port ${PORT}`);
});


//.env should have all application configurations, like env is dev or prod. 
//read env variables in one file to set values into global variables with default values as appropriate.