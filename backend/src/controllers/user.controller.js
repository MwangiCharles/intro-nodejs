import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt';

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        // Check if user already exists by email
        const existing = await User.findByEmail(email.toLowerCase());
        if (existing) {
            return res.status(409).json({ message: "Email already in use" });
        }
        
        // Check if username already exists
        const existingUsername = await User.findByUsername(username);
        if (existingUsername) {
            return res.status(409).json({ message: "Username already taken" });
        }
        
        // Create user
        const user = await User.create({ 
            username, 
            email: email.toLowerCase(), 
            password
        });
        
        res.status(201).json({ 
            message: "User registered successfully", 
            userId: user.insertId 
        });
        
    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ 
            message: "Internal server error", 
            error: err.message 
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        
        // Find user by email
        const user = await User.findByEmail(email.toLowerCase());
        
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        res.json({ 
            message: "Login successful", 
            userId: user.id,
            username: user.username 
        });
        
    } catch (err) {
        console.error("Error logging in:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;
        
        // Validate email is provided
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        
        // Find user by email using your existing method
        const user = await User.findByEmail(email.toLowerCase());
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Logout successful - client should clear session/token
        res.status(200).json({ 
            message: "Logout successful",
            success: true,
            userId: user.id,
            username: user.username
        });
        
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(500).json({ 
            message: "Internal server error", 
            error: error.message 
        });
    }
};
// Make sure both are exported
export { registerUser, loginUser, logoutUser };