const { Unauthorized, NotFound, BadRequest } = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();

const { SECRET_KEY } = process.env;
const { User } = require('../models/usersModel');

const registration = async body => {
    const user = await User.findOne({ email: body.email });
    if (user) {
        throw new Unauthorized('Email in use');
    }
    const verificationToken = uuidv4();
    return User.create({ ...body, verificationToken });
}

const login = async body => {
    const { email, password } = body;
    const user = await User.findOne({ email });
    if (!user) {
        throw new NotFound(`No user with ${email} found`);
    }

    if (!user.verify) {
        throw new NotFound('Email is not verified');
    }

    const isValidPassword = bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Unauthorized('Password is wrong');
    }

    const payload = {
        id: user._id
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '10d' });

    const userWithToken = await User.findByIdAndUpdate(user._id, { token });
    return { token, userWithToken };
}

const logout = async id => {
    return User.findByIdAndUpdate({ _id: id }, { token: null });
}

const verifyEmail = async verifyCode => {
    const user = await User.findOne({ verificationToken: verifyCode });
    if (!user) {
        throw new NotFound('User not found');
    }

    return User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null })
}

const resendFerifyEmail = async email => {
    const user = User.findOne({ email });
    if (!user) {
        throw new NotFound('User not found');
    }

    if (user.verify) {
        throw new BadRequest('Verification has already been passed');
    }
    return true;
}

const updateUser = async (id, body) => {
    return User.findByIdAndUpdate({ _id: id }, body);
}

module.exports = {
    registration,
    login,
    logout,
    verifyEmail,
    resendFerifyEmail,
    updateUser,
}