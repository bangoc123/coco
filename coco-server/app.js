import { config, underscoreId } from './global';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';
import socket from 'socket.io';
import { applyPassportStrategy } from './passport';
import SocketManager from './SocketManager';

import {
    issuesController,
    identityController,
    adminController,
    actionsController,
    usersController,
} from './controllers';

const express = require('express')
const app = express()

const { port, mongoDBUri } = config.env.dev;

// Set up bodyParser

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// Initialize passport to use

app.use(passport.initialize());

// Apply strategy to passport

applyPassportStrategy(passport);

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/issues', issuesController);
app.use('/identity', identityController);
app.use('/admin', adminController);
app.use('/actions', actionsController);
app.use('/users', usersController);

// Set up CORS 

app.use(cors());

const server = app.listen(port, () => {
    mongoose.connect(mongoDBUri).then(() => {
        console.log('Conneted to mongoDB at port 27017');
      });
    console.log('Example app listening on port 3000!');
})

// Initialize Socket IO.
const io = socket(server);

global.io = io;


const socketManager = new SocketManager(io);
