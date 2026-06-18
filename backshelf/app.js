//definitions and requirements
const express = require ('express');
const mysql = require ('mysql');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
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
//encryption functions
async function encrypt(pass) {
  const salt = 12;
  try {
    const encryptedPass = await bcrypt.hash(pass, salt);
    return encryptedPass;
    console.log("added encrypted password");
  }
  catch (error) {
    console.log("Failed encryption: ", error);
    throw error;
  }
}
async function comparePass(pass, encryptedPass) {
  try {
    const verdict = await bcrypt.compare(pass, encryptedPass);
    return verdict;
  }
  catch (error) {
    console.log("Failed password compare", error);
    throw error;
  }
}
//responses
//basic comms test
app.get('/test', (req, res) => {
  console.log('received message');
  var queryText = "select * from users;"
  mySQLCon.query(queryText, function (error, result) {
    if (error) throw error;
    //var resultFormat = JSON.stringify(result);
    res.send(result);
  })
})
//new user registration
app.post('/register', async (req, res) => {
    const reqData = req.body;
    const encryptedPass = await encrypt(reqData.pass);
    const queryText = `insert into users (First_Name, Last_Name, Username, Password) values ('${reqData.first}', '${reqData.last}', '${reqData.user}', '${encryptedPass}');`
    mySQLCon.query(queryText, (error, result) => {
      if (error) {
        console.log("DB Error: " + error.code);
        res.send(error.code);
        return;
      }
      const resultFormat = JSON.stringify(result);
      //console.log("got this result from function: " + resultFormat)
      res.send("REGISTRATION_OK");
    })
})
//existing user login
app.post('/login', (req, res) => {
    const reqData = req.body;
    const encryptedPass = encrypt(reqData.pass);
    console.log('searching for user: ' + reqData.user);
    const queryText = `select * from users where Username = '${reqData.user}'`;
    mySQLCon.query(queryText, async (error, result) => {
      if (error) {
        console.log("DB Error: " + error.code);
        res.send(error.code);
        return;
      }
      //console.log(result[0].Password);
      try {
        const loginVerdict = await comparePass(reqData.pass, result[0].Password)
        res.send(loginVerdict);
      }
      catch (error) {
        console.log("DB Error: " + error.code);
        res.send(error.code);
        return;
      } 
    })
})