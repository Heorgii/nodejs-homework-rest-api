const createError = require('http-errors');
const service = require('../service/contactsService')

const getContact = async (req, res) => {
    const result = await service.getCnt();
    res.json(result);
}

const contactById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await service.getCntById(contactId);

    if (!result) {
        return next(createError(404, 'Not found'));
    };

    res.json(result);
}

const createContact = async (req, res) => {
    const result = await service.addCnt(req.body);
    res.status(201).json(result);
}

const updateContact = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await service.updateCnt(contactId, req.body);

    if (!result) {
        return next(createError(404, 'Not found'));
    }

    res.json(result);
}

const updateStatusContact = async (req, res, next) => {
    const { contactId } = req.params;
    const { favorite } = req.body;

    const result = await service.updateStatusCnt(contactId, favorite);

    if (!result) {
        return next(createError(404, 'Not found'));
    }

    res.json(result);
}

const deleteContact = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await service.deleteCnt(contactId);

    if (!result) {
        return next(createError(404, 'Not found'));
    }

    res.json(result);
}

module.exports = {
    getContact,
    contactById,
    createContact,
    updateContact,
    updateStatusContact,
    deleteContact,
}