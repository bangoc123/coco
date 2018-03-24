import express from 'express';
import passport from 'passport';
import { check, validationResult } from 'express-validator/check';
import { Action } from '../db/models';

const actionsController = express.Router();
/**
 * entry point: /actions
 * method: GET
 */

actionsController.post('/', 
    passport.authenticate('jwt', { session: false }), 
    [
        check('issues')
            .exists()
            .withMessage('ISSUES_IS_EMPTY')
            .isLength({ min: 1 })
            .withMessage('ISSUES_LENGTH_IS_0'),
        check('content')
            .exists()
            .withMessage('CONTENT_IS_EMPTY'),
        check('name')
            .exists()
            .withMessage('NAME_IS_EMPTY')
],  async (req, res) => {
    const errorsAfterValidation = validationResult(req);
    if (!errorsAfterValidation.isEmpty()) {
        res.status(422).json({
        errors: errorsAfterValidation.mapped(),
        });
    } else {
        try {
            const { content, issues, name } = req.body;
            const action = new Action({ content, issues, name });
            await action.save();
            res.status(200).json({
                action,
            });
        } catch (e) {
            res.status(500).send({
                code: 500,
                message: e,
            });
        }

    }
});

export default actionsController;
