const bcrypt = require("bcrypt");
const pool =require("../config/db");
const { validateSignup } = require("../validations/auth.validation");
const { full_name } = require("../models/User");

async function register(req, res) {
    //validate input

    const error = validateSignup(req.body);
    if(error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }

    const {full_name, email, password} = req.body;

    try{
        //check if user already exists

        const existingUser = await pool.query("SELECT id FROM users WHERE email = $1", [email]);

        if (existingUser.rows.length > 0){
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //save user
        const newUser = await pool.query(`INSERT INTO users(id, full_name,email, password_hash)
            VALUES (gen_random_UUID(), $1, $2, $3)
            RETURNING id,full_name, email`, [full_name, email, hashedPassword]);

            // Return Response
          return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: newUser.rows[0]
          });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

module.exports = {register};