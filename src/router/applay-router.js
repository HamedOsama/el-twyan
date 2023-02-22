const express=require('express')
const router=express.Router()
const multer=require('multer')
const path=require('path')
const Applay=require('../model/apply')
const Uploads=multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(pdf)$/))
            return cb(new Error('please upload fil !'))
        cb(null,true)
    },
    storage:multer.diskStorage({
        destination:(req, file, cb)=>{
            const fullPath = path.join(__dirname, '../resume')
            cb(null,fullPath )
        },
        filename:(req,file, cb)=>{
            console.log(req.body);
            const fileName = Date.now().toString()+ "_" + file.originalname 
            cb(null, fileName)
        }
    }),
})
router.post('/jop/applay',Uploads.single('file'),async(req,res)=>{
    try{
        const applay= new Applay(req.body)
        if(req.file)
        applay.resume=req.file.filename
        await applay.save()
        res.status(200).send(applay)

    }
    catch(e){
        res.status(400).send(e.message)
    }
})
router.get('/applay/all',async(req,res)=>{
    try{
        const applaies= await Applay.find()
        res.status(200).send(applaies)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})
router.get('/applay/getbyid/:id',async(req,res)=>{
    try{
        const applayId=req.params.id
        const applay= await Applay.findById({_id:applayId})
        if(!applay){
            return res.status(404).send('لا توجد نتائج مطابقة')
        }
        return res.status(200).send(applay)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})
router.patch('/applay/update/:id',Uploads.single('file'),async(req,res)=>{
    try{ 
        const applayId=req.params.id
        const applay= await Applay.findByIdAndUpdate({_id:applayId},req.body,{new:true,
            runValidators:true})
            if(!applay)
            return res.status(404).send('لا توجد نتائج مطابقه')
            if(req.file){
                applay.resume=req.file.filename
            }
            await applay.save()
            res.status(200).send(applay)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})
router.delete('/applay/deletebyId/:id',async(req,res)=>{
    try{
        const applayId=req.params.id
        const applay=await Applay.findByIdAndDelete({_id:applayId})
        if(!applay){
        return res.status(404).send('لا توجد نتائج مطابقه')}
        res.status(200).send('done')
    }
    catch(e){
        res.status(400).send(e.message)
    }
})
router.delete('/applay/deleteall',async(req,res)=>{
    try{
       await  Applay.deleteMany({})
        res.status(200).send('done')
    }
    catch(e){
        res.status(400).send(e.message)
    }
})
module.exports=router