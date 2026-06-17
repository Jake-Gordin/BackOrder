//definitions and requirements
const express = require ('express');
const mysql = require ('mysql');
//begin listening on 5555 for front-end
const app = express();
const cors = require('cors');
app.use(cors());
app.listen(5555, () => console.log(`Listening on port 5555`));
//connect to local mysql
const mySQLCon = mysql.createConnection({
  host: "localhost",
  user: "clerk",
  password: "dbpass"
})
mySQLCon.connect(function(error) {
  if (error) throw erorr;
  console.log("connected to local mySQL");
  var sqlDB = "use inventory";
  mySQLCon.query(sqlDB, function (err, result) {
    if (err) throw err;
    console.log("DB set");
  })
})
//responses
app.get('/', (req, res) => {
  //res.send('Received on the live server!');
  console.log('received message');
  var queryText = "select * from users;"
  mySQLCon.query(queryText, function (error, result) {
    if (error) throw error;
    var resultFormat = JSON.stringify(result);
    res.send(resultFormat);
  })
})