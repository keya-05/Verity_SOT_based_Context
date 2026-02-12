import express from 'express'; // Changed from require
import dotenv from 'dotenv';   // Changed from require
import router from './src/routes/AuthRoutes.js';
import cors from 'cors';
import pinoHttp from 'pino-http';
import logger from './src/utils/logger.js';


dotenv.config(); 

const app = express();

app.use(pinoHttp({ logger }));

app.use(cors());

app.use(express.json());

// Routes
app.use('/api/auth', router);

const PORT = process.env.PORT || 8000; 

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

//startbnusing pinoLogger 
//then loggin levels setting debug, info, warning, error
//add try/catch blocks in controllers and log errors appropriately 
//all data base logic into repositoroty class only
//.env should have all application configurations, like env is dev or prod. 
//read env variables in one file to set values into global variables with defult values as appropriate.