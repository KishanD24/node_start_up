// import required essentials
const http = require('http');
const express = require('express');
var cors = require('cors');
const db = require('./database');
// import `items` from `routes` folder 
const itemsRouter = require('./routes/items');
const userRouter = require('./routes/user_route');

// create new app
// const app = express();
// app.use(express.json());
// // use it before all route definitions
// // allowing below URL to access these APIs end-points
// // you can replace this URL(http://localhost:8100) with your
// // application URL from where you are calling these APIs
// app.use(cors({origin: 'http://localhost:8100'}));

// create new app
const app = express();
// import `databse coonection` from `database.js` folder 
// var database = require('./database.js');

app.use(express.json());
// use it before all route definitions
// allowing below URL to access these APIs end-points
// you can replace this URL(http://localhost:8100) with your
// application URL from where you are calling these APIs
app.use(cors({origin: 'http://localhost:8100'}));

/* this '/items' URL will have two end-points:
→ localhost:3000/items/ (this returns array of objects)
→ localhost:3000/items/:id (this returns single object)
*/
app.use('/items', itemsRouter);
app.use('/user', userRouter);

// default URL to API
app.use('/', function(req, res) {
    res.send('node-ex-api works :-)');
});

const server = http.createServer(app);
const port = 3000;

db.getConnection()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server Started at http://localhost:3000`)
    })
    // https.createServer(options, app).listen(8443);
  })
  .catch((error) => {
    console.log(error)
  });

  
module.exports = app;
// const server = http.createServer(app);
// const port = 3000;
// server.listen(port);
// console.debug('Server listening on port ' + port);