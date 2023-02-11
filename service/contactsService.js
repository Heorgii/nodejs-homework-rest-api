const { Contact } = require('../models/contactsModel');

const getCnt = async (userId, query) => {
    const { page = 1, limit = 20, favorite } = query;
    const skip = (page - 1) * limit;

    if (favorite) {
        return Contact.find(
            { owner: userId, favorite: favorite },
            "",
            { skip, limit: +limit }
        ).populate('owner', '_id username email subscription');
    }

    return Contact.find(
        { owner: userId },
        "",
        { skip, limit: +limit }
    ).populate('owner', '_id username email subscription');
}

const getCntById = async (id, userId) => {
    return Contact.findById({ _id: id, owner: userId });
}

const addCnt = async body => {
    return Contact.create(body);
}

const updateCnt = async ({ _id, contactId, ...body }) => {
    return Contact.findByIdAndUpdate({ _id: contactId, owner: _id, body, new: true });
}

const updateStatusCnt = async (id, userId, body) => {
    return Contact.findByIdAndUpdate(
        { _id: id, owner: userId },
        { $set: { favorite: body } },
        { new: true }
    );
}

const deleteCnt = async (id, userId) => {
    return Contact.findByIdAndRemove({ _id: id, owner: userId });
}

module.exports = {
    getCnt,
    getCntById,
    addCnt,
    updateCnt,
    updateStatusCnt,
    deleteCnt,
}