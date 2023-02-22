const NewsLetter = require('../model/newsLetter');

const addNewsLetter = async (req, res, next) => {
  try {
    const newsLetter = await NewsLetter.create(req.body);
    await newsLetter.save();
    res.status(201).json({
      ok: true,
      status: 201,
      message: 'succeeded',
      data: newsLetter
    });
  }
  catch (e) {
    next(e);
  }
}

module.exports = {
  addNewsLetter
}