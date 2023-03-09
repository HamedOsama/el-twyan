const Contacts = require('../model/contacts');

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contacts.findOne({});

    res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      data: contacts,
    })
  } catch (e) {
    next(e);
  }
}
module.exports = {
  getAllContacts
}