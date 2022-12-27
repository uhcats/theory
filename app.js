const express = require('express');
const path = require('path');

const app = express();

app.listen(3000, () => {
  console.log('Servers is listening at http://localhost:3000/ Let\'s play a game!');
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

app.use(express.static(
  path.join(__dirname, 'public'),
));
