const express = require('express');
const router = express.Router();

const user = require('../../controllers/authController');
const schema = require('../../models/usersModel');
const validation = require('../../middlewares/validation');
const { auth } = require('../../middlewares/auth');
const upload = require('../../middlewares/upload');

router.post('/register',
    validation(schema.schemaRegister),
    user.registration,
);

router.post('/login',
    validation(schema.schemaLogin),
    user.login,
);

router.get('/logout', auth, user.logout);

router.get('/current', auth, user.getUser);

router.get('/verify/:verificationToken', user.verifyEmail);

router.post('/verify', validation(schema.schemaVerifyEmail), user.resendFerifyEmail);

router.patch('/',
    validation(schema.schemaUpdate),
    auth,
    user.updateUser
);

router.patch('/avatars',
    auth,
    upload.single('avatar'),
    user.updateAvatar
);


module.exports = router;