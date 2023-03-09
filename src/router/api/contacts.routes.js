const { Router } = require('express');

const contactsController = require('../../controller/contacts.controller');

const router = Router();

router.get('/', contactsController.getAllContacts);

module.exports = router;