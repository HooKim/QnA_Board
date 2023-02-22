const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const fs = require('fs');

const userDataFileName = "users.dat";
const port =  5500;
const cookie_data = [];
let users;
const user = {id : "", pw : ""};
let userId;


try{
  users = JSON.parse(fs.readFileSync(userDataFileName));
}
catch(e){
  users = [];
}

const saveUsers = () => {
  fs.writeFileSync(userDataFileName, JSON.stringify(users))
}

// middle-ware setting
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname ,'public')));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// app router GET
app.get('/login' , (req, res) => {
  // if(cookie_data.find(el => el === req.cookies.userId)){
  //   return res.redirect('/main');
  // }
  console.log('****!!!!GET');
  return res.status(200).sendFile(path.join(__dirname, 'login.html'));
})
app.get('/register', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, 'register.html'));
})

app.get('/main', (req, res) => {
  let cookie = Date.now() + userId;
  res.cookie('key', cookie, {httpOnly : true})
  return res.status(200).render('main', {name : userId});
})

// app router POST
app.post('/login' , (req, res) => {
  console.log('****POST');
  userId = req.body.userId;
  return res.redirect('/main');
})

app.post('/register', (req, res) => {
  const id = req.body.userId;
  const pw = req.body.userPw;
  users = [...users, {id, pw}];
  saveUsers();
  // return res.status(200).send(true)
  return res.status(200).send(true);
})
 
app.post('/register/valid-test', (req, res) => {
  const testId = req.body.testId.trim();
  if(users.find(el => el.id == testId) !== undefined){
    return res.status(200).send(false);
  }
  return res.status(200).send(true);
})

app.get('*', (req, res) => {
  return res.redirect('/login');
})
app.listen(port, () =>{
  console.log(`Server is Listening on port ${port}...`);
})






