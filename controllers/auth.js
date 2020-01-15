const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Database = require('nedb');

const usersDB = new Database({filename: './data/users'});
usersDB.loadDatabase();

module.exports.loginUser = (req, res)=>{
    usersDB.find({"username": username}, (err, data)=>{
        if(!err){
            bcrypt.compare(password, data[0].password, (err, result)=>{
                if (result) {
                    const token = jwt.sign({
                        username: username,
                        password: data[0].password
                    }, "PassPhrase", {expiresIn: "1d"});
                    res.send({token})
                }
                else {
                    res.send({message: "Что-то пошло не так"})
                }
            })
        }
        else {
            res.status(401).send({message: "Пользователь не найден"})
        }
    })
};
module.exports.addUser = (req, res)=>{
    const {username, password} = req.body;
    bcrypt.hash(password, 10)
        .then((hashed)=>{
            usersDB.insert({"username": username, "password": hashed});
            const token = jwt.sign({username: username, password: password}, "PassPhrase", {expiresIn: "1d"});
            res.send({token});
        })
        .catch((err)=>{
            res.status(400).send({message: err});
        })
};