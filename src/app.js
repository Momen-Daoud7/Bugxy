const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const csrf = require('csurf');

const connect = require('./config/database');
const User = require('./models/1-user');

// load dotenv
dotenv.config({ path: './config/config.env'});

const app = express();

// connect to database
connect();

// Session managment
app.use(session({
  secret:'3d93jd093jd0jnvhsdaw022h920',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl:process.env.MONGO_URL
  })
}))

// Mout routes
const auth = require('./routes/auth');
const users = require('./routes/users');
const projects = require('./routes/projects');
const tickets = require('./routes/tickets');
const comments = require('./routes/comments');
const errors = require('./routes/errors');


// Set static folder
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));


app.use(csrf());

app.use((req,res,next) => {
  if (!req.session.user) {
      return next();
    }
  User.findById(req.session.user.id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use((req,res,next) => { 
  app.locals.Auth = req.session.user;
  app.locals._csrf = req.csrfToken();
  next();
});

// Load routes
app.use(auth);
app.use('/users',users);
app.use('/projects',projects);
app.use('/tickets',tickets);
app.use('/comments',comments);
app.use(errors);
app.use('/',async (req,res,next) => {
  res.render('index')
});

const PORT = process.env.PORT || 5000;

// Run the server
app.listen(PORT,console.log(`Server running in `))

