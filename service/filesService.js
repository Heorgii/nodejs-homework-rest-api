const fs = require('fs').promises;
const path = require('path');

const publicDir = path.join(__dirname, "public");

const updateFiles = async (fieldname, file) => {
    const { path: tempName, originalname } = file;

    try {
        const publicFileUrl = path.join(publicDir, fieldname);
        await fs.rename(publicFileUrl, tempName);
    } catch (err) {
        await fs.unlink(tempName);
        throw err;
    }
}

module.exports = updateFiles;