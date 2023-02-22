const express=require('express')
const router=express.Router()
const multer=require('multer')
const Service=require('../model/services')
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

router.get('/service/getall',async(req,res)=>{
    try{
        const service= await Service.find()
        res.status(200).send(service)
    }
    catch(e){
        res.status(400).send(e.massage)
    }
})



// router.post('/service/add',Uploads.single('avatar'),async(req,res)=>{
//     try{
//         const service= new Service(req.body)
//     if(req.file){
//         service.image=req.file.filename
//     }
//  await service.save()
//     res.status(200).send(service)
//  }
//  catch(e){
//  res.status(400).send(e.message)
//     }
// })
// router.patch('/service/update/:id',Uploads.single('avatar'),async(req,res)=>{
// try{
//     const serviceId=req.params.id
//     const service= await Service.findByIdAndUpdate({_id:serviceId},req.body,
//     {new:true,
//         runValidators:true})
//     if(!service)
//     return res.status(200).send('لا توجد نتائج مطابقة')
//        if(req.file){
//        service.image=req.file.filename }
//     await service.save()
//   return  res.status(200).send(service)
// }
// catch(e){
//     res.status(400).send(e.message)
// }
// })
// router.get('/service/getbyid/:id',async(req,res)=>{
//     try{
//         const serviceId=req.params.id
//         const service = await Service.findById({_id:serviceId})
//         if(!service){
//         return res.status(404).send('لا توجد نتائج مطابقه ')}
//          return res.status(200).send(service)

//     }
//     catch(e){
//         res.status(400).send(e.message)
//     }
// })
// router.get('/service/getall',async(req,res)=>{
//     try{
//         const service= await Service.find()
//         res.status(200).send(service)
//     }
//     catch(e){
//         res.status(400).send(e.massage)
//     }
// })
// router.delete('/service/deletebyid/:id',async(req,res)=>{
//   try{
//     const serviceId=req.params.id
//     const service= await Service.findByIdAndDelete({_id:serviceId})
//     if(!service){
//         return res.status(404).send('لا توجد نتائج متطابقه')

//     }
//     return res.status(200).send("تمت العملية بنجاح")
//   }
//   catch(e){
//     res.status(400).send(e.massage)
//   }
// })
// router.delete('/service/deleteall',async(req,res)=>{
//     try{
//        await  Service.deleteMany({})
//         res.status(200).send('done')
//     }
//     catch(e){
//         res.status(400).send(e.message)
//     }
// })
module.exports=router