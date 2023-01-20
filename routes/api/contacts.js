const express = require('express')

const router = express.Router()

router.get('/', async (req, res, next) => {
  // res.json({ contacts });
  res.json({ message: 'Tets ' }); //template message
});

router.get('/:contactId', async (req, res, next) => {
  // const [contact] = contacts.find(contact =>{
  //   return contact.id === id;
  // })

  // return contact;
  res.json({ message: 'template message' });
});

router.post('/', async (req, res, next) => {

  res.json({ message: 'template message' });
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
