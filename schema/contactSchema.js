const Joi = require('joi');

const schemaContact = Joi.object({
    name: Joi.string().min(3).required(),

    email: Joi.string()
        .email({
            minDomainSegments: 2, tlds: { allow: ['com', 'net'] }
        }).required(),

    phone: Joi.string().min(5).required(),
});

module.exports = {
    schemaContact,
}