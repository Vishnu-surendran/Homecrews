const moongoose=require("mongoose")
const bcrypt=require("bcrypt")
const Schema= moongoose.Schema
const Adminschema=new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },salary:{
        type:Number
    }
})

Adminschema.statics.login=async function (Email,password){
    const admin=await this.findOne({Email})
    if(!admin){
        throw new Error("admin not exist")
    }
    const match=await bcrypt.compare(password,admin.password)
    return admin
}

module.exports=moongoose.model("Admin",Adminschema)