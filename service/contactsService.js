const { Contact } = require('../models/contactsModel');

const getCnt = async () => {
    return Contact.find();
}

const getCntById = async id => {
    return Contact.findById({ _id: id });
}

const addCnt = async body => {
    return Contact.create(body);
}

const updateCnt = async (id, body) => {
    return Contact.findByIdAndUpdate({ _id: id }, body, { new: true });
}

const updateStatusCnt = async (id, body) => {
    return Contact.findByIdAndUpdate({ _id: id }, { $set: { favorite: body } }, { new: true });
}

const deleteCnt = async id => {
    return Contact.findByIdAndRemove({ _id: id });
}

module.exports = {
    getCnt,
    getCntById,
    addCnt,
    updateCnt,
    updateStatusCnt,
    deleteCnt,
}