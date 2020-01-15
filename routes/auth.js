const router = require('express').Router();

const {showAuthForm, loginUser, addUser} = require('../controllers/auth');

router.post('/addServerUser', addUser);
router.post('/loginServerUser', loginUser);

module.exports = router;