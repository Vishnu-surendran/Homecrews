const mongoose=require('mongoose')
const Schema=mongoose.Schema
const bcrypt = require('bcrypt');


const userSchema=new Schema({
    username:{
type:String,
required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isBlocked:{
        type:Boolean,
        required:true
    },Phone:{
        type:String,
        required:true
    },otp:{
        type:String,
        required:true
    }
    ,isVerified:{
        type:Boolean,
        required:true
    },phone:{
        type:String
    },address:{
        type:String
    }

})
//signup
userSchema.statics.signup=async function (name,email,password,phone,otp){
const exist=await this.findOne({email})
if(exist){
    throw Error('Email already in use')
}
const salt=await bcrypt.genSalt(10)
const hash=await bcrypt.hash(password,salt)
const user=await this.create({
    username:name,
    email,
    password:hash,
    isBlocked:false,
    Phone:phone,
    isVerified:false,
    otp
})
return user
}

//login
userSchema.statics.login=async function(email,password){

    const user=await this.findOne({email})
    if(!user){
        throw Error('User does not exist')
    }
  const match=await bcrypt.compare(password,user.password)
  if(!match){
    throw Error('Invalid login credentials')
  }
  return user
}


module.exports=mongoose.model('User',userSchema)
