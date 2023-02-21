const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
    const email = { ...data, from: "rushchakheorgii@gmail.com" };
    try {
        await sgMail.send(email);
        return true;
    } catch (err) {
        throw err;
    }
}
const email = {
    to: "mihab58852@otanhome.com",
    from: "rushchakheorgii@gmail.com",
    subject: "Please verify your email address",
    html: `<p>Please verify your email address: </p><a href="" target="_blank">Confrim email</a>`
}

module.exports = sendEmail;

