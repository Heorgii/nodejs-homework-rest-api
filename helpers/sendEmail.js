const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY, DB_HOST } = process.env;
const BASE_URL = `http://localhost:${DB_HOST}/api`;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (email, verifyCode) => {
    const url = `${BASE_URL}/users/verify/${verifyCode}`
    const msg = {
        to: email,
        from: "rushchakheorgii@gmail.com",
        subject: "Please verify your email address",
        html: `<p>Please verify your email address: </p><a href="${url}" target="_blank">Confrim email</a>`
    }

    try {
        await sgMail.send(msg);
        return true;
    } catch (err) {
        throw err;
    }
}



module.exports = sendEmail;

