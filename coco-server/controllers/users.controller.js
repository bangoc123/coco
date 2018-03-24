import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
// import User from './../db/User';
import { User } from '../db/models';
import { check, validationResult } from 'express-validator/check';

const usersController = express.Router();

usersController.get('/', async (req, res) => {
    const { query } = req;
    const skip = parseInt(query.skip) || 0;
    const limit = parseInt(query.limit) || 0;
    try {
      const total = await User.count();
      const users = await User
        .find({})
        .skip(skip)
        .limit(limit)
        .lean()
        .exec();
      res.status(200).json({
        skip,
        limit,
        total,
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: error,
      });
    }
  });

  usersController.post('/', [ 
    check('name')
        .exists()
        .withMessage('NAME_IS_EMPTY'),
    check('uuid')
        .exists()
        .withMessage('UUID_IS_EMPTY'),
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
        const { uuid ,name, email, avatar } = req.body;
        try {
            // Add user to database
            const user = new User({ uuid ,username, email, avatar });
            await user.save();
            res.status(200).json({
                user,
            });
            
        } catch (error) {
            res.status(500).send({
                code: 500,
                message: error,
            });
        }
    }
  });

export default usersController;
