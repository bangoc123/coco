import express from 'express';
import { check, validationResult } from 'express-validator/check'
import { generatehashedPassword } from './../helper';
import { Admin } from '../db/models';

const adminController = express.Router();

adminController.post('/', [ 
    check('username')
        .exists()
        .withMessage('USERNAME_IS_EMPTY'),
    check('password')
        .exists()
        .withMessage('PASSWORD_IS_EMPTY')
        .isLength({ min: 8 })
        .withMessage('PASSWORD_LENGH_MUST_MORE_THAN_8'), 
    check('email')
        .exists()
        .withMessage('EMAIL_IS_EMPTY')
        .isEmail()
        .withMessage('EMAIL_WRONG_FORMAT')
    ], async (req, res) => {
    const errorsAfterValidation = validationResult(req);
        
    if (!errorsAfterValidation.isEmpty()) {
        res.status(422).json({
            errors: errorsAfterValidation.mapped(),
        });
    } else {
        const { username, password, email } = req.body;
        try {
            const hashedPassword = generatehashedPassword(password);
            // Add user to database
            const admin = new Admin({ email, username, hashedPassword });
            await admin.save();
            res.status(200).json({
                admin,
            });
            
        } catch (error) {
            res.status(500).send({
                code: 500,
                message: error,
            });
        }
    }
  });

export default adminController;
