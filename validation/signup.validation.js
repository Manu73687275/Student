const { body } =require ("express-validator");

const signupValidationRules = () => {
    return [
        body('Name')
            .isString().withMessage('Name must be a string')
            .notEmpty().withMessage('Name is required'),
        body('email')
            .isEmail().withMessage('Invalid email format')
            .notEmpty().withMessage('Email is required'),
        body('password')
            .custom((value) => {
                if (typeof value !== 'string' && typeof value !== 'number') {
                    throw new Error('Password must be either a string or a number');
                }
                return true;
            }).notEmpty().withMessage('Password is required')
    ];
}

module.exports = {
    signupValidationRules
};
