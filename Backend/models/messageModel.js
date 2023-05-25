const mongoose=require("mongoose")

const schema=mongoose.Schema


const Messageschema=new schema({
bookingid:{
    type:String,
    required:true
},Message:{type:String,
required:true
},
Author:{
    type:String,
    required:true
}
})

module.exports=mongoose.model("message",Messageschema)