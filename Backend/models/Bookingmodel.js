const moongoose=require("mongoose")
const bcrypt=require("bcrypt")
const { default: mongoose } = require("mongoose")
const Schema= moongoose.Schema
const Bookingschema=new Schema({
    customerid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },customername:{
        type:String,
        required:true
    },workerdetails:{
       type:Array,
       required:true,
      
    }, workerid:{
        type:String,
        required:true
       },payment:{
type:String,
required:true
    },date:{
        type:Date,
        required:true
    },transactionid:{
        type:String
    },address:{
        type:String,
        required:true
    },bookingstatus:{
type:Boolean,
required:true
    },month:{
        type:Number,
        required:true
    },from:{
        type:String,
        required:true
    },to:{
        type:String,
        required:true
    },money:{
        type:Number,
        required:true
    }

})

module.exports=mongoose.model("Booking",Bookingschema)