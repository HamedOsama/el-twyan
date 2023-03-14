const express = require('express')
const router = express.Router()
const Admin = require('../model/admin')
// const auth = require('../middelware/auth')
const Service = require('../model/services')
const Client = require('../model/clients')
const Request = require('../model/requests')
const Apply = require('../model/apply')
const Contacts = require('../model/contacts')
const Info = require('../model/information')
const Slider = require('../model/slider')
const Blog = require('../model/blog')
const NewsLetter = require('../model/newsLetter')
const multer = require('multer')
const path = require('path')
const sendToken = require('../middleware/jwtToken')
const Uploads = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|jfif)$/))
      return cb(new Error('please upload image !'))
    cb(null, true)
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const fullPath = path.join(__dirname, '../uploads')
      cb(null, fullPath)
    },
    filename: (req, file, cb) => {
      console.log(req.body);
      const fileName = Date.now().toString() + "_" + file.originalname
      cb(null, fileName)
    }
  }),
})

//slider
const addSlider = async (req, res, next) => {
  try {
    const slider = new Slider(req.body)
    if (req.file)
      slider.image = req.file.filename
    await slider.save()
    res.status(201).json({
      ok: true,
      status: 201,
      message: 'succeeded',
      body: slider
    })
  }
  catch (e) {
    next(e)
  }
}
const updateSlider = async (req, res, next) => {
  try {
    const sliderId = req.params.id
    const slider = await Slider.findByIdAndUpdate({ _id: sliderId }, req.body, {
      new: true,
      runValidators: true
    })
    if (!slider) {
      return res.status(404).send('not found')
    }
    if (req.file)
      slider.image = req.file.filename
    await slider.save()
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      body: slider
    })
  }
  catch (e) {
    next(e);
  }
}
const getAllSliders = async (req, res, next) => {
  try {
    const sliders = await Slider.find({})
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      body: sliders
    })
  }
  catch (e) {
    next(e);
  }
}
const deleteSlider = async (req, res, next) => {
  try {
    const sliderId = req.params.id
    const slider = await Slider.findByIdAndDelete({ _id: sliderId })
    if (!slider) {
      return res.status(404).send('not found')
    }
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
    })
  }
  catch (e) {
    next(e);
  }
}

// router.delete('/admin/slider/deleteall', auth, async (req, res) => {
//   try {
//     await Slider.deleteMany({})
//     res.status(200).send('done')
//   }
//   catch (e) {
//     res.status(400).send(e.message)
//   }
// })
// admin
// clients


const addClient = async (req, res, next) => {
  try {
    const client = new Client(req.body)
    if (req.file)
      client.image = req.file.filename
    await client.save()
    res.status(201).json({
      ok: true,
      status: 201,
      message: 'succeeded',
      body: client
    })
  }
  catch (e) {
    next(e)
  }
}
const updateClient = async (req, res, next) => {
  try {
    const clientId = req.params.id
    const client = await Client.findByIdAndUpdate({ _id: clientId }, req.body, {
      new: true,
      runValidators: true
    })
    if (!client) {
      return res.status(404).send('not found')
    }
    if (req.file)
      client.image = req.file.filename
    await client.save()
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      body: client
    })
  }
  catch (e) {
    next(e);
  }
}
const getAllClients = async (req, res, next) => {
  try {
    const client = await Client.find()
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      body: client
    })
  }
  catch (e) {
    next(e);
  }
}
const deleteClient = async (req, res, next) => {
  try {
    const clientId = req.params.id
    const client = await Client.findByIdAndDelete({ _id: clientId })
    if (!client) {
      return res.status(404).send('not found')
    }
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      body: 'client deleted'
    })
  }
  catch (e) {
    next(e)
  }
}
// router.delete('/admin/client/deleteall', auth, async (req, res) => {
//   try {
//     await Client.deleteMany({})
//     res.status(200).send('done')
//   }
//   catch (e) {
//     res.status(400).send(e.message)
//   }
// })


// //newsLetter

const getAllNewsLetters = async (req, res, next) => {
  try {
    const members = await NewsLetter.find()
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      body: members
    })
  }
  catch (e) {
    next(e);
  }
}


// requests
const getAllRequests = async (req, res, next) => {
  try {
    const requests = await Request.find()
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      body: requests
    })
  }
  catch (e) {
    next(e);
  }
}
const getRequestById = async (req, res, next) => {
  try {
    const requestId = req.params.id
    const request = await Request.findById({ _id: requestId })
    if (!request) {
      return res.status(404).send('wrong id')
    }
    return res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      body: request
    })
  }
  catch (e) {
    next(e);
  }
}
const updateRequest = async (req, res, next) => {
  try {
    const requestId = req.params.id
    const request = await Request.findByIdAndUpdate({ _id: requestId }, req.body, {
      new: true,
      runValidators: true
    })
    if (!request)
      return res.status(404).send('not found')
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      body: request
    })
  } catch (e) {
    next(e);
  }
}
const deleteRequest = async (req, res, next) => {
  try {
    const requestId = req.params.id
    const request = await Request.findByIdAndDelete({ _id: requestId })
    if (!request) {
      return res.status(404).send('not found')
    }
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      body: 'request deleted'
    })
  } catch (e) {
    next(e);
  }
}

// router.delete('/admin/request/deleteall', auth, async (req, res) => {
//   try {
//     await Request.deleteMany({})
//     res.status(200).send('done')
//   }
//   catch (e) {
//     res.status(400).send(e.message)
//   }
// })

// apply

const getAllApplies = async (req, res, next) => {
  try {
    const applies = await Apply.find({})
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      body: applies
    })
  }
  catch (e) {
    next(e)
  }
}
const getApplyById = async (req, res, next) => {
  try {
    const applyId = req.params.id
    const apply = await Apply.findById({ _id: applyId })
    if (!apply) {
      return res.status(404).send('not found')
    }
    return res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      body: apply
    })
  }
  catch (e) {
    next(e);
  }
}
const deleteApply = async (req, res, next) => {
  try {
    const applyId = req.params.id
    const apply = await Apply.findByIdAndDelete({ _id: applyId })
    if (!apply) {
      return res.status(404).send('not found')
    }
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      body: 'apply deleted'
    })
  }
  catch (e) {
    next(e)
  }
}

// router.delete('/admin/applay/deleteall', auth, async (req, res) => {
//   try {
//     await Applay.deleteMany({})
//     res.status(200).send('done')
//   }
//   catch (e) {
//     res.status(400).send(e.message)
//   }
// })

// services

const addService = async (req, res, next) => {
  try {
    const service = new Service(req.body)
    if (req.file)
      service.image = req.file.filename
    await service.save()
    res.status(201).json({
      ok: true,
      status: 201,
      message: 'succeeded',
      body: service
    })
  }
  catch (e) {
    next(e)
  }
}
const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find()
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      body: services
    })
  }
  catch (e) {
    next(e)
  }
}
const getServiceById = async (req, res, next) => {
  try {
    const serviceId = req.params.id
    const service = await Service.findById({ _id: serviceId })
    if (!service) {
      return res.status(404).send('not found')
    }
    return res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      body: service
    })
  }
  catch (e) {
    next(e);
  }
}
const updateService = async (req, res, next) => {
  try {
    const serviceId = req.params.id
    const service = await Service.findByIdAndUpdate({ _id: serviceId }, req.body, {
      new: true,
      runValidators: true
    })
    if (!service)
      return res.status(404).send('not found')
    if (req.file) {
      service.image = req.file.filename
    }
    await service.save()
    return res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      body: service
    })
  }
  catch (e) {
    next(e)
  }
}
const deleteService = async (req, res, next) => {
  try {
    const serviceId = req.params.id
    const service = await Service.findByIdAndDelete({ _id: serviceId })
    if (!service) {
      return res.status(404).send('not found')
    }
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      body: 'service deleted'
    })
  }
  catch (e) {
    next(e)
  }
}

// router.delete('/admin/service/deleteall', auth, async (req, res) => {
//   try {
//     await Service.deleteMany({})
//     res.status(200).send('done')
//   }
//   catch (e) {
//     res.status(400).send(e.message)
//   }
// })

//




// contacts
const addContact = async (req, res, next) => {
  try {
    const contact = new Contacts(req.body)
    await contact.save()
    res.status(201).json({
      ok: true,
      status: 201,
      message: 'succeeded',
      body: contact
    })
  }
  catch (e) {
    next(e)
  }
}
const getContacts = async (req, res, next) => {
  try {
    const contact = await Contacts.findOne({})
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      body: contact
    })
  }
  catch (e) {
    next(e)
  }
}
const updateContact = async (req, res, next) => {
  try {

    const contactId = req.params.id
    console.log(req.body)
    const contacts = await Contacts.findByIdAndUpdate({ _id: contactId }, req.body, {
      new: true,
      runValidators: true
    })
    if (!contacts)
      return res.status(404).send('not found')
    await contacts.save()
    return res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      body: contacts
    })
  }
  catch (e) {
    next(e)
  }
}
// admin
const signUp = async (req, res, next) => {
  try {
    const admin = new Admin(req.body)
    await admin.save()
    sendToken(admin, 201, res);
  }
  catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const admin = await Admin.Login(req.body.email, req.body.password)
    sendToken(admin, 200, res);
  }
  catch (e) {
    next(e);
  }
}
const logout = async (req, res, next) => {
  try {
    req.admin.tokens = req.admin.tokens.filter(el => {
      return el != req.cookies.access_token;
    })
    await req.admin.save()


    res.status(200).clearCookie('access_token', {
      httpOnly: true,
      secure: true,
      path: '/',
      domain: '.tawyanoffice.com',
      sameSite: 'lax',
    }).json({
      ok: true,
      code: 200,
      message: 'succeeded',
    })
  }
  catch (e) {
    next(e);
  }
}
const auth = async (req, res, next) => {
  try {
    res.status(200).json({
      ok: true,
      code: 200,
      message: 'succeeded',
    })
  } catch (e) {
    next(e)
  }
}
const updateProfile = async (req, res, next) => {
  try {
    const Update = Object.keys(req.body)
    Update.forEach(el => { req.admin[el] = req.body[el] })

    
    await req.admin.save()
    res.status(200).json({
      ok: true,
      code: 200,
      message: 'succeeded',
      body: req.admin
    })
  }
  catch (e) {
    next(e)
  }
}



// router.get('/profile', auth, async (req, res) => {
//   try {
//     res.status(200).send(req.admin)
//   }
//   catch (e) {
//     res.status(500).send(e.message)
//   }
// })
// router.patch('/admin/update', auth, async (req, res) => {
//   try {
//     const Update = Object.keys(req.body)
//     Update.forEach(el => { req.admin[el] = req.body[el] })

//     await req.admin.save()
//     res.status(200).send(req.admin)

//   }
//   catch (e) {
//     res.status(500).send(e.message)
//   }
// })
// router.delete('/admin/logout', auth, async (req, res) => {
//   try {
//     req.admin.tokens = req.admin.tokens.filter(el => {
//       return el != req.token
//     })
//     await req.admin.save()
//     return res.status(200).send('succefully deleted')


//   }
//   catch (e) {
//     res.status(500).send(e.message)
//   }
// })

// router.delete('/admin/logoutall', auth, async (req, res) => {
//   try {
//     req.admin.token = []
//     await req.admin.save()
//     res.status(200).send('succefully deleted')
//   }
//   catch (e) {
//     res.status(500).send(e.message)
//   }
// })
// //general-information

const addInfo = async (req, res, next) => {
  try {
    const info = new Info(req.body)
    await info.save()
    res.status(201).json({
      ok: true,
      status: 201,
      message: 'succeeded',
      body: info
    })
  }
  catch (e) {
    next(e)
  }
}
const getAllInfo = async (req, res, next) => {
  try {
    const info = await Info.find({})
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      body: info
    })
  }
  catch (e) {
    next(e)
  }
}
const updateInfo = async (req, res, next) => {
  try {
    const infoId = req.params.id
    const info = await Info.findByIdAndUpdate({ _id: infoId }, req.body, {
      new: true,
      runValidators: true
    })
    if (!info)
      return res.status(404).send('not found')
    await info.save()
    return res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      body: info
    })
  }
  catch (e) {
    next(e)
  }
}
const deleteInfo = async (req, res, next) => {
  try {
    const infoId = req.params.id
    const info = await Info.findByIdAndDelete({ _id: infoId });
    if (!info)
      return res.status(404).send('not found');
    return res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      body: info
    })
  }
  catch (e) {
    next(e)
  }
}


// //blog
const addBlog = async (req, res, next) => {
  try {
    const blog = new Blog(req.body)
    if (req.file) {
      blog.image = req.file.filename
    }
    await blog.save()
    res.status(201).json({
      ok: true,
      status: 201,
      message: 'succeeded',
      body: blog
    })
  }
  catch (e) {
    next(e)
  }
}
const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({})
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      body: blogs
    })
  }
  catch (e) {
    next(e)
  }
}
const updateBlog = async (req, res, next) => {
  try {
    const blogId = req.params.id
    const blog = await Blog.findOneAndUpdate({ _id: blogId }, req.body, {
      new: true,
      runValidators: true
    })
    if (!blog) {
      return res.status(404).send('not found')
    }
    await blog.save()
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      body: blog
    })
  }
  catch (e) {
    next(e)
  }
}
const deleteBlog = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findOneAndDelete({ _id: blogId });
    if (!blog)
      return res.status(404).send("not found");
    res.status(200).json({
      ok: true,
      status: 200,
      message: "succeeded",
      body: "successfuly deleted"
    });
  } catch (e) {
    next(e);
  }
}

// router.delete('/admin/blog/deleteall', auth, async (req, res) => {
//   try {
//     await Blog.deleteMany({})
//     res.status(200).send('done')
//   }
//   catch (e) {
//     res.status(400).send(e.message)
//   }
// })

module.exports = {
  addSlider,
  updateSlider,
  getAllSliders,
  deleteSlider,
  addClient,
  updateClient,
  getAllClients,
  deleteClient,
  getAllNewsLetters,
  getAllRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
  getAllApplies,
  getApplyById,
  deleteApply,
  addService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
  addContact,
  getContacts,
  updateContact,
  addBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  addInfo,
  getAllInfo,
  updateInfo,
  deleteInfo,
  signUp,
  login,
  logout,
  auth,
  updateProfile
}