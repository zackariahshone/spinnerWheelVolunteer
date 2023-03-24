const express = require('express');
const path = require('path');
const routes = require('./Routes');
const bodyParser = require('body-parser');
const session = require('express-session');

require('./dbconfig/connection');

// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 5000;

app.set('trust proxy', 1) 

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(routes);
app.use(express.static("client/build"));
app.listen(PORT, () => console.log(`Listing on  port ${PORT}`));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
// app.get('/',(req,res)=>{
//     res.send('in sever')
// })