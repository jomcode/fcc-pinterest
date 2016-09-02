const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compress = require('compression');
const session = require('express-session');
const morgan = require('morgan');
const passport = require('passport');
const RedisStore = require('connect-redis')(session);

const configurePassport = require('./config/passport');
const redisConfig = require('./config').redis;
const sessionSecret = require('./config').sessionSecret;
const appUrl = require('./config').appUrl;
const userService = require('./services/user');
const postService = require('./services/post');
const twitterAccountService = require('./services/twitteraccount');
const twitterLoginService = require('./services/twitterlogin');
const initializeServices = require('./services');

const app = express();

app.set('views', path.join(__dirname, 'services', 'twitterlogin', 'views'));
app.set('view engine', 'ejs');

const logMode = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';

if (process.env.NODE_ENV !== 'test') app.use(morgan(logMode));

const corsOptions = {
  origin: appUrl,
  credentials: true
};

app.use(compress());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/dist', express.static('dist'));

const redisOptions = {
  url: redisConfig
};

// TODO move sessions to twitter auth endpoint only? would need jwt
app.use(session({
  store: new RedisStore(redisOptions),
  secret: sessionSecret,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production'
    // maxAge: 360000 // ms - 6 mins
  }
}));

configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  if (process.env.NODE_ENV !== 'production') {
    return res.redirect('http://127.0.0.1:8080'); // for twitter callback
  }
  return res.redirect('/dist');
});

app.get('/foo', (req, res) => {
  res.status(200).json({ foo: 'bar' });
});

if (process.env.NODE_ENV === 'production') app.set('trust proxy', 1);

app.use(userService);
app.use(postService);
app.use(twitterAccountService);
app.use(twitterLoginService(passport));

initializeServices(app);

module.exports = app;
