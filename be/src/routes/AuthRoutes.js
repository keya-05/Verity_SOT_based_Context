import express from 'express';
import { Login, Register } from '../controllers/AuthController.js'; // Import your controller

const router = express.Router();

// This defines the HTTP Verb (POST) and the endpoint path
router.post('/Login', Login); 
router.post('/Register',Register);


export default router;