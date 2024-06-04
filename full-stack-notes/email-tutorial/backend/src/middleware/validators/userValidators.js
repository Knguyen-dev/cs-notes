const { body } = require("express-validator");

/**
 *
 * @param {integer} minAge - Minimum age
 * @param {string} dateOfBirth - String in the form 'yyyy-mm-dd' representing the user's date of birth
 * @returns
 */
const isUnderAge = (minAge, dateOfBirth) => {
    const now = new Date();
    const dob = new Date(dateOfBirth);

    // Get the difference in years
    const age = now.getFullYear() - dob.getFullYear();

    // If younger than minAge, they are underage, so return true
    if (age < minAge) {
        return true;
    } else {
        return false;
    }
}

const userValidators = {

    name: body("name").trim().escape().isLength({min: 1, max: 32}).withMessage("Name must be between 1 and 32 characters!"),
    email: body("email").trim().escape().isEmail().withMessage("Please enter a valid email format!").isLength({ max: 32 }).withMessage("Maximum email length is 32 characters!"),
    password: body("password")
        .trim()
        .custom(password => {
            /*
            + Password regex, same as the one on the front-end:
            1. ^: start of the string
            2. (?=.*[a-z]): Checks for at least one lower case letter
            3. (?=.*[A-Z]): Checks for at least one upper case letter
            4. (?=.*\d): Checks for at least one digit
            5. (?=.*[!@#$%^&*]): Checks for at least one of those 'special' characters listed between the brackets
            6. (?!.*\s): No white spaces for entire string, which makes sense since it's a password.
            7. .{8, 40}: String is at least 8 characters and at most 40.
            8. $: End of the string
            */
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s).{8,40}$/;
            return passwordRegex.test(password);
        }).withMessage("Password needs to be 8 to 40 characters, and must have one uppercase letter, lowercase letter, symbol, and one number. No white spaces!"),
    dateOfBirth: body("dateOfBirth").trim().custom(dateOfBirth => {

        // Assuming you want to accept date in the format 'yyyy-mm-dd'
        const regex = /^([0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9])$/;

        if (!regex.test(dateOfBirth)) {
            return new Error("Date of birth format is invalid. Please enter DOB in form 'yyyy-mm-dd'!");
        }

        const minimumAge = 13;

        // Check if the user is underaged.
        if (isUnderAge(minimumAge, dateOfBirth)) {
            return new Error(`Need to be at least ${minimumAge} years old to signup!`);
        }

        return true;
    })
}

module.exports = userValidators;