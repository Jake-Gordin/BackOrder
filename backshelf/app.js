//definitions and requirements
const express = require ('express');
const mysql = require ('mysql');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
//begin listening on 5555 for front-end
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
//db functions
function registerUser(registerData) {
    var queryText = `insert into users (First_Name, Last_Name, Username, Password) values ('${registerData.first}', '${registerData.last}', '${registerData.user}', '${registerData.pass}');`
    mySQLCon.query(queryText, function (error, result) {
      if (error) {
        throw error;
        console.log(error.code);
      }
      var resultFormat = JSON.stringify(result);
      return result;
    })
}
//responses
app.get('/test', (req, res) => {
  console.log('received message');
  var queryText = "select * from users;"
  mySQLCon.query(queryText, function (error, result) {
    if (error) throw error;
    var resultFormat = JSON.stringify(result);
    res.send(resultFormat);
  })
})
app.post('/register', (req, res) => {
    res.send("got your registration request!");
    var reqData = req.body;
    var queryText = `insert into users (First_Name, Last_Name, Username, Password) values ('${registerData.first}', '${registerData.last}', '${registerData.user}', '${registerData.pass}');`
    mySQLCon.query(queryText, (error, results) => {
      if (error) {
        console.log("DB Error: " + error.code);
        res.send(error.code);
        return;
      }

    })
    console.log("got this result from function: " + result)
    res.send(result);
  })