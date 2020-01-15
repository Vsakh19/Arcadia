const router = require('express').Router();

const {getNotes, newNote, deleteNote} = require('../controllers/notes');

router.get('/getServerNotes', getNotes);
router.post('/addServerNotes', newNote);
router.delete('/deleteServerNotes', deleteNote);

module.exports = router;