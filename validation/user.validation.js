const {body}= require ("express-validator");

const userValidationRules = () => {
    return [
        body('Name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Invalid email format').notEmpty().withMessage('Email is required'),
        body('age').isInt({ min: 0 }).withMessage('Age must be a positive integer').notEmpty().withMessage('Age is required'),
        body('qualification').custom((value) => {
            if (typeof value !== 'string' && typeof value !== 'number') {
                throw new Error('Qualification must be either a string or a number');
            }
            return true;
        }).notEmpty().withMessage('Qualification is required'),
        body('collegeName').isString().withMessage('College name must be a string').notEmpty().withMessage('College name is required')
    ];
}

module.exports = {
    userValidationRules
};
