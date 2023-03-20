const mongoose=require('mongoose')
const Schema=mongoose.Schema
const serviceSchema=new Schema({
    name:{
        type:String,
        required:true
    },
experience:{
    type:Number,
    required:true
},
category:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
image:{
    type:String,
    required:true
},isUnlisted:{
    type:Boolean
}
})

module.exports=mongoose.model('Service',serviceSchema)