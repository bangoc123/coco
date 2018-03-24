import { config, underscoreId } from './global';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import {
    issuesController
} from './controllers';

const express = require('express')
const app = express()

const { port, mongoDBUri } = config.env.dev;


// Set up bodyParser

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/issues', issuesController);

app.listen(port, () => {
    mongoose.connect(mongoDBUri).then(() => {
        console.log('Conneted to mongoDB at port 27017');
      });
    console.log('Example app listening on port 3000!');
})