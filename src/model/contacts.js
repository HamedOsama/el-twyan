const mongoose=require('mongoose')
const validator=require('validator')
const contactSchema=mongoose.Schema({
    email:{
        type:String,
        trim:true,
        lowercase:true,
        required:true,
        validate(value){
            if(!validator.isEmail(value))
            throw new Error('please enter valid email')
        }
    },
    mainPhone:{
        type:String,
        trim:true,
        required:true,
        validate(value){
            if(!validator.isMobilePhone(value))
            throw new Error("please enter valid phone number ")
        }
        
    } ,
    subPhone:{
        type:String,
        trim:true,
        required:true,
        validate(value){
            if(!validator.isMobilePhone(value))
            throw new Error("please enter valid phone number ")
        }
        
    } ,
    address:{
      en:{
        type:String,
        trim:true,
      },
      ar:{
        type:String,
        trim:true,
      }
    }
})
const Contact=mongoose.model('contact',contactSchema)
module.exports=Contact