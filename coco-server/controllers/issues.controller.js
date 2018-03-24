import express from 'express';
import passport from 'passport';
import cors from 'cors';
// import User from './../db/User';
import { Issue, User } from '../db/models';
import SocketManager from './../SocketManager';


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
    const issues = await Issue
      .find({})
      .populate({
        path: 'user',
        select: 'username',
      })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
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
    const { issue, uuid } = req.body;
    if (!issue) {
        res.status(400).json({
          code: 400,
          message: 'Body is empty',
        });
    } else {
        try {
            const issueToSave = new Issue(issue);
            const result = await issueToSave.save();
            // Find user 

            // Board cast to client.
            const socketManager = new SocketManager();
            socketManager.io.emit('IssuesCreated', {
              result
            });

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
