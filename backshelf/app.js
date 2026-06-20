//definitions and requirements
const express = require ('express');
const mysql = require ('mysql');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
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
    const UUID = crypto.randomInt(50000);
    //console.log(UUID);
    const sqlparams = [UUID, reqData.first, reqData.last, reqData.user, encryptedPass];
    const queryText = `insert into users (ID, First_Name, Last_Name, Username, Password) values (?, ?, ?, ?, ?);`
    mySQLCon.query(queryText, sqlparams, (error, result) => {
      if (error) {
        console.log("DB Error: " + error.code);
        res.send(error.code);
        return;
      }
      const resultFormat = JSON.stringify(result);
      //console.log("got this result from function: " + resultFormat)
      const currentUser = {
            currentUser: reqData.user
        }
      res.send(currentUser);
    })
})
//existing user login
app.post('/login', (req, res) => {
    const reqData = req.body;
    const encryptedPass = encrypt(reqData.pass);
    //console.log('searching for user: ' + reqData.user);
    const sqlparams = [reqData.user];
    const queryText = `select * from users where Username = ?`;
    mySQLCon.query(queryText, sqlparams, async (error, result) => {
      if (error) {
        console.log("DB Error: " + error.code);
        const currentUser = {
            currentUser: "NO_USER",
            currentID: 0
        }
        res.send(currentUser);
        return;
      }
      //console.log(result[0].Password);
      try {
        const loginVerdict = await comparePass(reqData.pass, result[0].Password)
        if (result === undefined) {
          const currentUser = {
            currentUser: "NO_USER",
            currentID: 0
        }
        res.send(currentUser);
        }
        if (loginVerdict) {
          const currentUser = {
            currentUser: reqData.user,
            currentID: result[0].ID
          }
          res.send(currentUser);
        }
        else {
           const currentUser = {
            currentUser: "BAD_PASS",
            currentID: 0
          }
          res.send(currentUser);
        }
      }
      catch (error) {
        console.log("DB Error: " + error.code);
        res.send(error.code);
        return;
      } 
    })
})
//add new item
app.post('/items', (req, res) => {
    const reqData = req.body;
    //console.log("searching using: " + reqData.user);
    const sqlParams = [reqData.user];
    const queryText = `select ID from users where Username = ?`;
    mySQLCon.query(queryText, sqlParams, async (error, result) => {
      if (error) {
        console.log("DB Error: " + error.code);
        res.send("ERR_NO_USER");
        return;
      }
      console.log(result);
      try {
        const userID = result[0].ID;
        console.log("adding item using ID: " + result[0].ID);
        const UUID = crypto.randomInt(50000);
        //console.log(UUID);
        const sqlParamItem = [UUID, userID, reqData.name, reqData.description, reqData.quantity];
        const queryTextItem = `insert into items (ID, User_ID, Item_Name, Description, Quantity) values (?, ?, ?, ?, ?);`
        mySQLCon.query(queryTextItem, sqlParamItem, (errorItem, resultItem) => {
          if (errorItem) {
            console.log("DB Error: " + error.code);
            res.send("ITEM_ADD_ERROR");
            return;
          }
          else {
            res.send("ITEM_ADD_OK");
          }
        })
      }
      catch (error) {
        console.log("DB Error: " + error.code);
        res.send(error.code);
        return;
      } 
    })
})
//edit existing item
app.put('/items', (req, res) => {
    const reqData = req.body;
    const sqlParams = [reqData.name, reqData.description, reqData.quantity, reqData.id];
    const queryText = `update items set Item_Name = ?, Description = ?, Quantity = ? where ID = ?;`
    mySQLCon.query(queryText, sqlParams, async (error, result) => {
      if (error) {
        console.log("DB Error: " + error.code);
        res.send("DB ERROR: " + error.code);
        return;
      }
      else {
        res.send("ITEM_EDIT_OK");
      }
    })
})
//delete existing item
app.delete('/items', (req, res) => {
    const reqData = req.body;
    targetID = reqData.id;
    const sqlParams = [targetID];
    const queryText = `delete from items where ID = ?;`
    mySQLCon.query(queryText, sqlParams, async (error, result) => {
      if (error) {
        console.log("DB Error: " + error.code);
        res.send("DB ERROR: " + error.code);
        return;
      }
      else {
        res.send("ITEM_DELETE_OK");
      }
    })
})
//list all items
app.get('/items', (req, res) => {
    const queryText = `select * from items`;
    mySQLCon.query(queryText, async (error, result) => {
      if (error) {
        console.log("DB Error: " + error.code);
        res.send("DB_ERROR: " + error.code);
        return;
      }
      else {
        res.send(result);
      }
    })
})
//list user-specific items
app.post('/users/items', (req, res) => {
    //console.log("received request: " + req);
    //console.log("experiment " + req.id);
    const reqData = req.body;
    //console.log("received data: " + reqData);
    const targetID = reqData.id;
    //console.log("received request for user-specific items using ID: " + targetID)
    const sqlParams = [targetID];
    const queryText = `select * from items where User_ID = ?`;
    mySQLCon.query(queryText, sqlParams, async (error, result) => {
      if (error) {
        console.log("DB Error: " + error.code);
        res.send("DB_ERROR: " + error.code);
        return;
      }
      else {
        res.send(result);
      }
    })
})