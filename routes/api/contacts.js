const express = require('express');
const contacts = require('../../controllers/contactsController.js');
const router = express.Router();

const schema = require('../../models/contactsModel');
const validation = require('../../middlewares/validation');
const { auth } = require('../../middlewares/auth');

router.get('/', auth, contacts.getContact);

router.get('/:contactId', auth, contacts.contactById);

router.post('/',
  validation(schema.schemaAddContact),
  auth,
  contacts.createContact
);

router.put('/:contactId',
  validation(schema.schemaUpdateContact),
  auth,
  contacts.updateContact
);

router.patch('/:contactId/favorite',
  validation(schema.schemaUpdateStatus),
  auth,
  contacts.updateContact
);

router.delete('/:contactId',
  auth,
  contacts.deleteContact
);

module.exports = router;
