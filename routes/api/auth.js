const express = require('express');
const router = express.Router();

const user = require('../../controllers/authController');
const schema = require('../../models/usersModel');
const validation = require('../../middlewares/validation');
const auth = require('../../middlewares/auth');

router.post('/register',
    validation(schema.schemaRegister),
    user.registration,
);

router.post('/login',
    validation(schema.schemaLogin),
    user.login,
);

router.get('/logout', auth, user.logout);

router.get('/current', auth, user.logout);

router.patch('/',
    validation(schema.schemaUpdate),
    auth,
    user.updateUser
);

module.exports = router;
