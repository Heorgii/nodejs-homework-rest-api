const operation = require('../models/contacts');

const getContact = async (req, res) => {
    const result = await operation.listContacts();

    res.json({
        status: 'success',
        code: 200,
        data: {
            result,
        },
    });
}

const contactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await operation.getContactById(contactId);

    if (!result) {
        res.json({
            status: 'error',
            code: 404,
            message: 'Not found',
        });
    }

    res.json({
        status: 'success',
        code: 200,
        data: {
            result,
        },
    });
}

const createContact = async (req, res) => {
    const result = await operation.addContact(req.body);

    res.status(201).json({
        status: 'success',
        code: 201,
        message: "Added contact",
        data: {
            result,
        },
    });
}

const deleteContact = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await operation.removeContact(contactId);

    if (!result) {
        res.json({
            status: 'error',
            code: 404,
            message: "Not found",
    
        });
    }

    res.json({
        status: 'success',
        code: 200,
        message: "Added contact",
        data: {
            result,
        },
    });
}

const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await operation.updateContact(contactId, req.body);

    if (!result) {
        res.json({
            status: 'error',
            code: 404,
            message: "Not found",
        });
    }

    res.json({
        status: 'success',
        code: 200,
        message: "Updated contact",
        data: {
            result,
        },
    });
}

module.exports = {
    getContact,
    contactById,
    createContact,
    deleteContact,
    updateContact
}