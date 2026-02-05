const bcrypt = require("bcrypt");
const pool = require("../config/db");
const { validateSignup } = require("../validations/auth.validation");
// REMOVED: const { full_name } = require("../models/User"); // This was causing a conflict

async function register(req, res) {
    // 1. Validate input
    const error = validateSignup(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }

    const { full_name, email, password } = req.body;

    try {
        // 2. Check if user already exists
        const existingUser = await pool.query("SELECT id FROM users WHERE email = $1", [email]);

        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Save user (Simplified ID handling)
        const newUser = await pool.query(
            `INSERT INTO users (full_name, email, password_hash)
             VALUES ($1, $2, $3)
             RETURNING id, full_name, email`, 
            [full_name, email, hashedPassword]
        );

        // 5. Return Response
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: newUser.rows[0]
        });

    } catch (err) {
        console.error("Registration Error:", err.message);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

module.exports = { register };