const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compress = require('compression');
const session = require('express-session');
const morgan = require('morgan');

const userService = require('./services/user');
const postService = require('./services/post');
const twitterAccountService = require('./services/twitteraccount');

const app = express();

const logMode = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';

if (process.env.NODE_ENV !== 'test') app.use(morgan(logMode));

app.use(compress());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'));

app.get('/foo', (req, res) => {
  res.status(200).json({ foo: 'bar' });
});

app.use(userService);
app.use(postService);
app.use(twitterAccountService);

module.exports = app;
