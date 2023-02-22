const mongoose=require('mongoose')
const validator=require('validator')

const requestSchema=mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        minLength:3
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        required:true,
        validate(value){
            if(!validator.isEmail(value))
            throw new Error('هذا البريد الإلكتروني غير صالح الرجاء إدخال بريد إلكتروني آخر')
        }
    },
    phone:{
        type:String,
        trim:true,
        required:true,
        validate(value){
            if(!validator.isMobilePhone(value))
            throw new Error("الرجاءإدخال رقم هاتف صالح ")
        }
        
    },
    serviceType:{
        type:String,
        trim:true,
        required:true,
        minLength:3
    },
    message:{
        type:String,
        trim:true,
       // required:true,
        minLength:3
    }

})
const Request=mongoose.model('requests',requestSchema)
module.exports=Request