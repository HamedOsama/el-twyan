const express = require('express')
const router = express.Router()
const Request = require('../model/requests')

router.post('/request/add', async (req, res) => {
    try {
        const request = new Request(req.body)
        await request.save()
        res.status(200).send(request)
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})
router.get('/request/getall', async (req, res) => {
    try {
        const request = await Request.find()
        res.status(200).send(request)
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})
router.get('/request/getbyid/:id', async (req, res) => {
    try {
        const requestId = req.params.id
        const request = await Request.findById({ _id: requestId })
        if (!request) {
            return res.status(404).send('لا توجد نتائج مطابقة')
        }
        return res.status(200).send(request)
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})
router.patch('/request/update/:id', async (req, res) => {
    try {
        const requestId = req.params.id
        const request = await Request.findByIdAndUpdate({ _id: requestId }, req.body, {
            new: true,
            runValidators: true
        })
        if (!request) {
            return res.status(404).send('لا توجد نتائج مطابقة')
        }
        await request.save()
        return res.status(200).send(request)
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})
router.delete('/request/deletebyid/:id', async (req, res) => {
    try {
        const requestId = req.params.id
        const request = await Request.findByIdAndDelete({ _id: requestId })
        if (!request) {
            return res.status(404).send('لاتوجد نتائج مطابقه')
        }
        return res.status(200).send('تمت الإزاله')
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})
router.delete('/request/deleteall', async (req, res) => {
    try {
        await Request.deleteMany({})
        res.status(200).send('done')
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})
module.exports = router