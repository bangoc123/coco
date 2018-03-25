import express from 'express';
import passport from 'passport';
import { check, validationResult } from 'express-validator/check';
import { Action } from '../db/models';
import { underscoreId } from '../global';

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
            .withMessage('NAME_IS_EMPTY'),
        check('area')
            .exists()
            .withMessage('AREA_IS_EMPTY')
],  async (req, res) => {
    const errorsAfterValidation = validationResult(req);
    if (!errorsAfterValidation.isEmpty()) {
        res.status(422).json({
        errors: errorsAfterValidation.mapped(),
        });
    } else {
        try {
            const { content, issues, name, area } = req.body;
            const action = new Action({ content, issues, name, area });
            await action.save();
            // Board cast to users.
            
            Action.findOne(action[underscoreId])
                .populate({ path: 'issues', select: 'user', populate: { path: 'user' } }).then((action) => {
                    console.log('=======action', action);
                    // Get list of users overhere
                    const issuesID = action.issues.map(issue => issue.user.uuid);
                    console.log('========issuesID', issuesID);
                });          
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

actionsController.get('/', async (req, res) => {
    const { query } = req;
    const skip = parseInt(query.skip) || 0;
    const limit = parseInt(query.limit) || 0;
    try {
      const total = await Action.count();
      const actions = await Action
        .find({})
        .populate({
          path: 'issues',
        })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec();
      res.status(200).json({
        skip,
        limit,
        total,
        data: actions,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: error,
      });
    }
});


actionsController.get('/:id', async (req, res) => {
    const actionId = req.params.id;
    
    try {   
        const action = await Action.findById(actionId).populate({
            path: 'issues',
        }).lean().exec();
        res.status(200).json(action);
    } catch(e) {
        console.log('======e', e);
        res.status(500).json({
            code: 500,
            message: e,
        });
    }

});

export default actionsController;
