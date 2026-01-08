import express from 'express'; // Changed from require
import dotenv from 'dotenv';   // Changed from require
import router from './src/routes/AuthRoutes.js';
import cors from 'cors';

dotenv.config(); 

const app = express();

app.use(cors());

app.use(express.json());

// Routes
app.use('/api/auth', router);

const PORT = process.env.PORT || 8000; 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});