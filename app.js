const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')
app.use(express.static("public"));


app.listen(PORT || process.env, () => {
  console.log('Server is listening at http://localhost:3000');

});



app.get('/register', (req, res) => {
  res.render('register.ejs')
})


app.get('/login', (req, res) => {
  res.render('login.ejs')
})