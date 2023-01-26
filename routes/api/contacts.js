const express = require('express');
const contacts = require('../../controllers/contacts');
const router = express.Router();

const { schemaCnt: schema } = require('../../schema');
const validation = require('../../middlewares/validation');

router.get('/', contacts.getContact);

router.get('/:contactId', contacts.contactById);

router.post('/',
  validation(schema.schemaContact),
  contacts.createContact
);

router.put('/:contactId',
  validation(schema.schemaContact),
  contacts.updateContact
);

router.delete('/:contactId',
  contacts.deleteContact
);

module.exports = router;
