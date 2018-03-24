import { config, underscoreId } from './global';
import mongoose from 'mongoose';

const express = require('express')
const app = express()

const { port, mongoDBUri } = config.env.dev;

app.get('/', (req, res) => res.send('Hello World!'))


app.listen(port, () => {
    mongoose.connect(mongoDBUri).then(() => {
        console.log('Conneted to mongoDB at port 27017');
      });
    console.log('Example app listening on port 3000!');
})