const express=require('express')
const app=express()
require('dotenv').config()
const mongoose=require('mongoose')
const cors=require("cors")
const serviceRoutes=require('./routes/serviceRoutes')
const userRoutes=require('./routes/userRoutes')
const adminRoutes=require("./routes/adminRoutes")
const adminService=require("./routes/adminAuthorized")
const workerRoutes=require("./routes/WorkerRoutes")


app.use(cors())

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


const server= app.listen(process.env.PORT,()=>{
  console.log(`listening on port ${process.env.PORT}`);
})

const io=require("socket.io")(server,{
  cors:{
    origin:"http://localhost:3000"
  }
})


io.on("connection",(socket)=>{
  
console.log("socket connected")

socket.on("join connection",(room,auth)=>{
socket.join(room)
console.log("connected",room,auth)
socket.emit("connected")
})

socket.on("send message",(data)=>{
  console.log(data)
  socket.to(data.room).emit("recieve message",data)
})

})
mongoose.connect(process.env.MONGO_URI)
.then((response)=>{
console.log('connected on mongoose');


}).catch((err)=>{
  console.log(err);
})

