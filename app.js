const express      = require('express');
const path         = require('path');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const cors         = require('cors');
const session      = require('express-session');
const passport     = require('passport');


require("dotenv").config();

require("./config/mongoose-setup");
require("./config/passport-setup");


const app = express();



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cors({
    // accept cookies across domains
    credentials: true,
    // ONLY allow these domains to connect
    origin: [ 'http://localhost:4200' ]
  })
);
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: 'this should probably go in the .env file'
  })
);
app.use(passport.initialize());
app.use(passport.session());


// ROUTERS ---------------------------------------------------------------------

const matchApi = require('./routes/match-api-router');
app.use('/api', matchApi);


const userApi = require('./routes/user-api-router');
app.use('/api', userApi);

// END ROUTERS -----------------------------------------------------------------


// send the Angular HTML if no Express routes match
app.use((req, res, next) => {
    res.sendFile(__dirname + '/public/index.html');
});



module.exports = app;
