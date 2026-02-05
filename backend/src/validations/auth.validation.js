/** Validation for user sign up */

function validateSignup(data) {
    const {full_name,email,password } = data;

    if (!full_name || !email || !password ){
        return "All fields are required";
    }

    if (!email.includes("@")){
        return "invalid email format";
    }

    if (password.length < 8 ){
        return "Password must be up to 8 characters";
    }

    return null; //valid
}

module.exports = {validateSignup};