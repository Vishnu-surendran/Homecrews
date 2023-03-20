const mongoose=require("mongoose")

const schema=mongoose.Schema


const Messageschema=new schema({
workerid:{
    type:String,
    required:true
},Message:{type:String,
required:true
}
})

module.exports=mongoose.model("message",Messageschema)