const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
//
const login = require('./apps/login');
const house = require('./apps/house');
const show = require('./apps/show');
//


const app = express();

let intialPath = path.join(__dirname, "public");
console.log(intialPath);

app.use(bodyParser.json());
app.use(express.static(intialPath));

// Router
app.get('/', (req, res) => { res.sendFile(path.join(intialPath, "index.html")); })
app.get('/login', (req, res) => { res.sendFile(path.join(intialPath, "login.html")); })
app.get('/register', (req, res) => { res.sendFile(path.join(intialPath, "register.html")); })
app.get('/house', (req, res) => { res.sendFile(path.join(intialPath, "house.html")); })
app.get('/room', (req, res) => { res.sendFile(path.join(intialPath, "room.html")); })
app.get('/barChart', (req, res) => { res.sendFile(path.join(intialPath, "barChart.html")); })
app.get('/radarChart', (req, res) => { res.sendFile(path.join(intialPath, "radarChart.html")); })


app.listen(3000, (req, res) => {
    console.log('listening on port 3000......')
})


app.post('/register-user', login.register_user)
app.post('/login-user', login.login_user)
//
app.post('/house', house.create_house)
app.post('/house-get', house.get_houses)
//
app.post('/showByType',show.showByType)