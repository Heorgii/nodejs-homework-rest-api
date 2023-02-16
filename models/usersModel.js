const { Schema, model } = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');
// const gravatar = require('gravatar');

const schemaUser = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Set name for user'],
        },
        password: {
            type: String,
            required: [true, 'Set password for user'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter"
        },
        avatar: {
            avatarURL: String,
            //  EDIT GRAVATAR /////
        },
        token: String
    },
    { versionKey: false, timestamps: true },
);

schemaUser.pre('save', async () => {
    if (this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

const User = model('user', schemaUser);


const schemaRegister = Joi.object({
    username: Joi.string().min(3).required(),

    email: Joi.string()
        .email({
            minDomainSegments: 2, tlds: { allow: ['com', 'net'] }
        }).required(),

    password: Joi.string().min(6).required(),

    subscription: Joi.string(),
});

const schemaLogin = Joi.object({
    email: Joi.string()
        .email({
            minDomainSegments: 2, tlds: { allow: ['com', 'net'] }
        }).required(),

    password: Joi.string().min(6).required(),
});

const schemaUpdate = Joi.object({
    username: Joi.string().min(3),
    subscription: Joi.string().valid('starter', 'pro', 'business'),
});

module.exports = {
    User,
    schemaRegister,
    schemaLogin,
    schemaUpdate,
}