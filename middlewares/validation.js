const createError = require('http-errors');

const validation = schema => {
    return (res, req, next) => {
        if (Object.keys(req.body).length === 0) {
            return next(createError(400, 'Missing fields'));
        }

        const error = schema.validate(req.body);
        if (error) {
           error.status = 400;
           nexr(error);
        }

        next();
    };
}

module.exports = validation;
