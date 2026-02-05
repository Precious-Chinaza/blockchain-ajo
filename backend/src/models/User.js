/**User Model - represents registered user in the system
 * This represents users' table structure
 */


const UserModel = {
    id : "UUID",
    full_name : "string",
    email:  "string (unique)",
    password_hash: "string",
    wallet_balance: "number",
    created_at : "timestamp"
};

module.exports = UserModel;