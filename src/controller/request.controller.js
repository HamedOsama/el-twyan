const Request = require('../model/requests')


const addRequest = async (req, res, next) => {
  try {
    const request = new Request(req.body)
    await request.save()
    res.status(201).json({
      ok: true,
      status: 201,
      message: 'succeeded',
      data: request
    });
  }
  catch (e) {
    next(e);
  }
}
const getRequests = async (req, res, next) => {
  try {
    const requests = await Request.find().exec();
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      data: requests
    });
  }
  catch (e) {
    next(e);
  }
}
// router.post('/request/add', async (req, res) => {
//     try {
//         const request = new Request(req.body)
//         await request.save()
//         res.status(200).send(request)
//     }
//     catch (e) {
//         res.status(400).send(e.message)
//     }
// })
// router.get('/request/getall', async (req, res) => {
//   try {
//     const request = await Request.find()
//     res.status(200).send(request)
//   }
//   catch (e) {
//     res.status(400).send(e.message)
//   }
// })

module.exports = {
  addRequest,
  getRequests
}