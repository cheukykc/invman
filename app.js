let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let sessions = require('express-session');


let mongo = require('./public/javascripts/mongo')
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let createRouter = require('./routes/newItem');
let itemRouter = require('./routes/item')

let app = express();

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//username and password
const user = {
  name: 'demo',
  password: ''
}

// a variable to save a session
let session;

app.get('/users', function(req,res, next) {
  if (!req.session.authenticated) { res.redirect('/'); }
  usersRouter(req, res, next)
});

app.post('/user', function(req, res) {
  //console.log(req.body)
  if (user.name === req.body.username && user.password === req.body.password) {
    req.session.authenticated = true;
    req.session.username = user.name;
    console.log("Login Success.")
    res.redirect('/users')
  } else {
    res.redirect('/')
    console.log("Login Failed. Please try again")
  }
})

app.post('/create', function(req, res){
  mongo.insert('inventory', req.body).then(r => console.log(r)).catch(console.error)
  res.redirect('/users')
})

app.post('/delete', function(req, res){
  mongo.delete('inventory', req.body.query.id).then(r => console.log(r)).catch(console.error)
})

app.post('/update', function(req, res){
  mongo.update('inventory', req.body.query.id, req.body.update).then().catch(console.error)
})

app.get('/logout', function (req, res, next) {
  req.session = null
  res.redirect('/')
})
app.get('/create',function (req, res){
  console.log("redirect")
  res.render('new', { title: 'Inventory Management System'});
})

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/new', createRouter)
app.use('/item', itemRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
