import db from '../models/db.js'; // Import the pool we created above

// This function must handle the Request and Response
export const Login = async (req, res) => {
    
    // 1. Get data from the frontend (Postman Body)
    const { username, password } = req.body; 

    try {
        // 2. Run the query (No cursors needed in JS)
        const query = "SELECT * FROM users WHERE username = ? AND password = ?";
        
        // db.query returns an array: [rows, fields]
        const [rows] = await db.query(query, [username, password]);

        // 3. Check results
        if (rows.length > 0) {
            // Success: Send JSON back to Postman
            return res.status(200).json({ 
                message: "Login Successful", 
                user: rows[0] 
            });
        } else {
            // Failure
            return res.status(401).json({ 
                message: "Invalid credentials" 
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
};

export const Register = async (req,res) => {
    const { username, password, email } = req.body;

    try {
        const query = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
        const [result] = await db.query(query, [username, password, email]);

        return res.status(201).json({ 
            message: "User Registered Successfully", 
            userId: result.insertId 
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}