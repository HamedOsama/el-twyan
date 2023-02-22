const multer = require('multer')
const path = require('path')
const Apply = require('../model/apply')
const uploadCv = multer({
  limits: {
    fileSize: 52428800
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf)$/))
      return cb(new Error('please upload file !'))
    cb(null, true)
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const fullPath = path.join(__dirname, '../resume')
      cb(null, fullPath)
    },
    filename: (req, file, cb) => {
      console.log(req.body);
      const fileName = Date.now().toString() + "_" + file.originalname
      cb(null, fileName)
    }
  }),
})
const applyToJob = async (req, res, next) => {
  console.log(1)
  try {
    const apply = new Apply(req.body)
    if (req.file)
      apply.resume = req.file.filename
    await apply.save()
    res.status(201).json({
      ok: true,
      status: 201,
      message: 'succeeded',
      data: apply
    })
  }
  catch (e) {
    console.log(e);
    next(e);
  }
}
// router.post('/jop/applay', Uploads.single('file'), async (req, res) => {
//   try {
//     const applay = new Applay(req.body)
//     if (req.file)
//       applay.resume = req.file.filename
//     await applay.save()
//     res.status(200).send(applay)

//   }
//   catch (e) {
//     res.status(400).send(e.message)
//   }
// })

module.exports = {
  applyToJob,
  uploadCv
}