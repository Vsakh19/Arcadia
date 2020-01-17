const Database = require('nedb');
const notesDB = new Database({filename: './data/notes'});

notesDB.loadDatabase();

module.exports.getNotes = (req, res)=>{
    const {user} = req;
    notesDB.find({"author": user.username}, (err, data)=>{
        if(!err) {
            res.send(data);
        }
        else{
            res.status(404).send({message: "Database error"})
        }
    })

};

module.exports.newNote = (req, res)=>{
    const {author, text, date} = req.body;
    if (author!==null && text!==null && date!==null) {
        notesDB.insert({author: author, text: text, reminder: date});
    }
    notesDB.find({author: author, text: text}, (err, data)=>{
        if(err){
            res.send({message: err})
        }
        else {
            res.send(data);
        }
    })
};

module.exports.deleteNote = (req, res)=>{
    const {id} = req.body;
    notesDB.find({_id: id}, (err, data)=>{
        if (req.user.username === data[0].author){
            notesDB.remove(data[0]);
            res.status(200).send({});
        }
    })
};