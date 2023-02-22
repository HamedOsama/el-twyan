const express=require('express')
const router=express.Router()
const multer=require('multer')
const Client=require('../model/clients')
const path=require('path')
const Uploads=multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png|jfif)$/))
            return cb(new Error('please upload image !'))
        cb(null,true)
    },
    storage:multer.diskStorage({
        destination:(req, file, cb)=>{
            const fullPath = path.join(__dirname, '../uploads')
            cb(null,fullPath )
        },
        filename:(req,file, cb)=>{
            console.log(req.body);
            const fileName = Date.now().toString()+ "_" + file.originalname 
            cb(null, fileName)
        }
    }),
})

router.post('/client/add',Uploads.single('avatar'),async(req,res)=>{
 try{
   const client= new Client(req.body)
   client.image=req.file.filename
    await client.save()
   res.status(200).send(client)
 }
 catch(e){
    res.status(400).send(e.message)
 }
})
router.get('/client/getall',Uploads.single('avatar'),async(req,res)=>{
    try{
        const client= await Client.find()
        res.status(200).send(client)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})
router.patch('/client/update/:id',Uploads.single('avatar'),async(req,res)=>{
    try{
        const clientId=req.params.id
        const client= await Client.findById({_id:clientId})
        client.image=req.file.filename
        await client.save()
        res.status(200).send(client)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})
router.delete('/client/delete/:id',async(req,res)=>{
    try{
        const clientId=req.params.id
        const client =await Client.findByIdAndDelete({_id:clientId})
        res.status(200).send('تمت العملية بنجاح')
    }
    catch(e){
        res.status(400).send(e.message)
    }
})
router.delete('/client/deleteall',async(req,res)=>{
    try{
       await  Client.deleteMany({})
        res.status(200).send('done')
    }
    catch(e){
        res.status(400).send(e.message)
    }
})
module.exports=router