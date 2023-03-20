const mongoose=require("mongoose")
const Schema=mongoose.Schema

const categorySchema= new Schema({
name:{
    type:String,
    required:true
},isUnlisted:{
    type:Boolean,
    required:true
}
})

module.exports=mongoose.model("category",categorySchema)