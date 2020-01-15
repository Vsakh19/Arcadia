const express = require('express');
const bodyParser = require('body-parser');
const Database = require('nedb');
const path = require('path');
const authRouter = require('./routes/auth');
const notesRouter = require('./routes/notes');
const auth = require('./middlewares/auth');

const usersDB = new Database({filename: './data/users'});
usersDB.loadDatabase();
const notesDB = new Database({filename: './data/notes'});
notesDB.loadDatabase();

const app = express();
const {PORT = 3000} = process.env;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use('/auth', authRouter);
app.use('/notes', auth,  notesRouter);

app.listen(PORT, ()=>{
    console.log("Server is running");
});

app.get('*', (req, res)=>{
    res.redirect("/");
});