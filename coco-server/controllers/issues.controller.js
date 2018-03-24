import express from 'express';
import passport from 'passport';
// import User from './../db/User';
import { Issue, User } from '../db/models';

const issuesController = express.Router();
/**
 * entry point: /issues
 * method: GET
 */

issuesController.get('/', async (req, res) => {
  const { query } = req;
  const skip = parseInt(query.skip) || 0;
  const limit = parseInt(query.limit) || 0;
  try {
    const total = await Issue.count();
    console.log('========total Issues', total);
    const issues = await Issue
      .find({})
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      skip,
      limit,
      total,
      data: issues,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error,
    });
  }
});

issuesController.post('/', async (req, res) => {
    console.log('=====req.body', req.body);
    const { issue } = req.body;
    console.log('------issues', issue);
    if (!issue) {
        res.status(400).json({
          code: 400,
          message: 'Body is empty',
        });
    } else {
        try {
            const issueToSave = new Issue(issue);
            const result = await issueToSave.save();

            // Create user.
            // const userToSave = new User()
            
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({
            code: 500,
            message: error,
            });
        }
    }
});

export default issuesController;
