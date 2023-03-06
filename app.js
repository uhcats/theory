if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const bcrypt = require('bcrypt');
const initializePassport = require('./passport-config');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');

initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)


app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')
app.use(express.static("public"));

app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));


app.listen(PORT || process.env, () => {
  console.log('Server is listening at http://localhost:3000');

});

const users = [];




app.get('/zalogowany', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name })
})



app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: "/zalogowany",
  failureRedirect: "/login",
  failureFlash: true,
}))



app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})


app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    let pass = req.body.password.toString();

    const hashedPassword = await bcrypt.hash(pass, 10);


    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    console.log(users);
    res.redirect('/login');
  } catch (error) {
    console.log(error);

    res.redirect('/register');
  }
})

app.delete('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});



function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/zalogowany')
  }
  next();
}


