const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
require('./src/middleware/passport-setup'); // Your Passport configuration
const mongodb = require('./src/db/connect');

const port = process.env.PORT || 3000;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use(session({
    secret: 'your session secret', // Replace with a real secret in production
    resave: false,
    saveUninitialized: false, // Changed to false to avoid creating sessions for unauthenticated requests
    cookie: { secure: process.env.NODE_ENV === 'prod' } // Secure cookies should only be set if you're in a production environment with HTTPS
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use('/', require('./src/routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
