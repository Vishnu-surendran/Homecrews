const express=require('express')
const app=express()
require('dotenv').config()
const mongoose=require('mongoose')
const serviceRoutes=require('./routes/serviceRoutes')
const userRoutes=require('./routes/userRoutes')
const adminRoutes=require("./routes/adminRoutes")
const adminService=require("./routes/adminAuthorized")
const workerRoutes=require("./routes/WorkerRoutes")




app.use((req,res,next)=>{
console.log(req.path, req.method)
next()
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/images",express.static("images"))
app.use('/api/admin/services',serviceRoutes)
app.use("/api/workers",workerRoutes)
app.use('/api/user',userRoutes)
app.use('/api/admin/signin',adminRoutes)
app.use("/api/admin",adminService)
mongoose.connect(process.env.MONGO_URI)
.then((response)=>{
console.log('connected on mongoose');
app.listen(process.env.PORT,()=>{
    console.log('listening on port');
})
}).catch((err)=>{
  console.log(err);
})

