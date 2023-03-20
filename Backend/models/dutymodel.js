const mongoose=require("mongoose")
const schema=mongoose.Schema

const Dutyschema= new schema({
    workerid:{
        type:String,
        required:true
    },
    timefrom:{
        type:String,
        required:true
    },
    timeto:{
        type:String,
        required:true
    }
}) 

module.exports=mongoose.model("duty",Dutyschema)