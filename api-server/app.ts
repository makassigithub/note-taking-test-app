import express from 'express';
import cors from 'cors';
import notesRouter from './routes/noteRoutes';
import config from './config';

const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/notes', notesRouter);

app.listen(config.port, () => {
  console.log(`Application is running on port ${config.port}.`);
});

// For testing
module.exports = app;
