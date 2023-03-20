const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const workers = require("../models/Workermodel");
const Booking=require("../models/Bookingmodel")
const admin=require("../models/AdminModel")
const twilio = require("twilio")(process.env.SID, process.env.AUTHTOKEN);
const stripe=require("stripe")(process.env.SECRETKEY)
const uuid=require("uuid").v4
const crypto=require("crypto")
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "2d" });
};
const Razorpay = require('razorpay');
var instance = new Razorpay({
  key_id: process.env.RAZORKEY,
  key_secret: process.env.RAZORSECRET,
});


const loginUser = async (req, res) => {

  const { email, password } = req.body;
  console.log(req.body);
  try {
    const userExist = await User.login(email, password);
    const tokens = createToken(userExist._id);
    const name = userExist.username;

    res.status(200).json({ name, tokens });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: "cannot login" });
  }
};

const registerUser = async (req, res) => {
  const { username, email, password, phone } = req.body;
  const otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  try {
    async function main() {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      });

      let info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Signup OTP",
        text: `Your otp for signinig is ${otp}`,
      });
    }
    main();
    const user = await User.signup(username, email, password, phone, otp);
    const token = await createToken(user._id);
    res.status(200).json({ token, user: user._id });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "user not found" });
  }

  /* try{
  const message= await twilio.messages.create({
        from:process.env.TWILIOPHONE,
        to:"+91"+phone,
        body:`Your otp is ${otp}` })
const user=await User.signup(username,email,password,phone,otp)
const token=await createToken(user._id)
res.status(200).json({token,user:user._id})
}catch(error){
  console.log(error.message)
res.status(400).json({error:error.message})
} */
};

const resendOtp = async (req, res) => {
  const { id } = req.body;
  console.log("id", id);
  const otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  /*  try{
    const user= await User.findByIdAndUpdate({_id:id},{otp:otp})
    const message= await twilio.messages.create({
        from:process.env.TWILIOPHONE,
        to:"+91"+user.Phone,
        body:`Your otp is ${otp}` })
    res.status(200).json({message:"Otp has been successfully send"})
   }catch(err){

   } */
  try {
    const user = await User.findByIdAndUpdate({ _id: id }, { otp: otp });
    async function main() {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      });

      let info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: user.email,
        subject: "Signup otp",
        text: `Your otp for signinig is ${otp}`,
      });
    }
    main();
    res.status(200).json({ message: "Otp has been successfully send" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "user not found" });
  }
};

const passwordRequest = async (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  try {
    const userexist = await User.findOne({ email: email });
    const token = createToken(userexist._id);
    async function main() {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      });

      let info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Password reset",
        text: `Your link for resetting password has been given below.http://localhost:3000/resetpassword/${token}`,
      });
    }
    main();
    res.status(200).json(email);
  } catch (err) {
    res.status(400).json({ message: "user not found" });
  }
};

const resetPassword = async (req, res) => {
  const { password, id } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  try {
    const { _id } = jwt.verify(id, process.env.SECRET);

    const changePassword = await User.updateOne(
      { _id: _id },
      { password: hash }
    );
    res.status(200).json(changePassword);
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

const otpVerification = async (req, res) => {
  console.log(req.body);
  const { otp, id } = req.body;
  try {
    const user = await User.findById({ _id: id });
    if (user.otp === otp) {
      res.status(200).json({ message: "otp verification successfull" });
    }
  } catch (err) {
    res.status(400).json({ message: "otp verification failed" });
  }
};

const allWorkers = async (req, res) => {
  try {
    const workerList = await workers.find();
    res.status(200).json(workerList);
  } catch (err) {
    res.status(400).json({ err: "couldnt get worker details" });
  }
};



const workerfetch=async(req,res)=>{
  
const {id}=req.params
try{
const find=await workers.find({service:{ $regex: new RegExp(id),$options:"i"}})
if(find.length===0){
throw new Error("no data available")
}else{

  res.status(200).json(find)
}
}catch(error){
  console.log(error.message);
res.status(400).json(error.message)
}

}

const userProfile=async(req,res)=>{
  const id=req.user

  try{
const profile=await User.findById({_id:id})
res.status(200).json(profile)
  }catch(error){
res.status(400).json({message:"Profile not found"})
  }

}

const updateProfile=async(req,res)=>{
  const id=req.user
const{name,email,phone,address}=req.body
  try{
const update=await User.findOneAndUpdate({_id:id},{name:name,email:email,phone:phone,address:address},{new:true})
res.status(200),json(update)  
}catch(error){
res.status(400).json({message:"Unable to update"})
  }
}



const book=async(req,res)=>{
  const{payment}=req.body
  const id=req.user
  console.log(req.user,"user");
if(payment==="online") {
  const{payment,address,wid,from,to}=req.body
  try{

    var options = {
      amount: 5000,  
      currency: "INR",
      receipt: "order_rcptid_11"
    };

const userfind=await User.findById({_id:id})

    const workerdetails=await workers.findOne({_id:wid})
 const order=await instance.orders.create(options)
    const currentdate=new Date()
    const month=currentdate.getMonth()
 
   const response=await Booking.create({
     customerid:id,customername:userfind.username,workerid:wid,workerdetails:workerdetails,payment:payment,date:currentdate,month:month,transactionid:order.id,address:address,bookingstatus:false
   ,from:from,to:to,money:order.amount})
   const customerdetails=await User.findById({_id:id}) 
   function percentage(totalValue) {
    console.log(totalValue);
    return (100 * 10) / totalValue;
 } 
 
 const admamount=percentage(order.amount)

 const amount=order.amount-admamount
   const work={
    payment_type:"online",
    cust_id:id,
    payment:amount,
    customername:customerdetails.username,
    bookedon:response.date,
    from:response.from,
    to:response.to,
   }

    const update=await workers.updateOne({_id:wid},{ $inc:{ worksDone:1}, $push:{works:work}})
    res.status(200).json({order:order})
      }catch(err){
    console.log(err)
    res.status(400).json(err.message)
      }
} else{
  const currentdate=new Date()
  const month=currentdate.getMonth()
  const{address,wid,payment}=req.body
try{
  const response=await Booking.create({
    customerid:id,workerid:wid,payment:payment,date:currentdate,month:month,address:address,money:200
  })

  res.status(200).json(response)
}catch(error){
  console.log(error)
  res.status(400).json(error.message)
}

}
 /* 
  try{
   
    res.status(200).json(response)
  }catch(error){
   
  } */

}


const Bookings=async(req,res)=>{
  const id=req.user

try{
  const worker=await Booking.find({customerid:id})
  console.log(worker);
/* const response=await Booking.find({workerid:worker.workerid}).populate("workerid").exec()
console.log(response); */
res.status(200).json(worker)
}catch(error){
res.status(400).json(error.message)
}
}

const payment=async(req,res)=>{
 try{
 
 }catch(error){
res.status(400).json(error.message)
 }
 
}

const keyGet=(req,res)=>{
  console.log(process.env.RAZORKEY);

res.status(200).json({key:process.env.RAZORKEY})
}

const paymentverify=async(req,res)=>{
  let body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
  const id=req.params.id
  console.log(req.body.razorpay_order_id,req.body.razorpay_payment_id,"kk")
  try{
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORSECRET)
    .update(body.toString())
    .digest('hex');
    console.log(expectedSignature)
const isAuthentic=req.body.razorpay_signature===expectedSignature
if(isAuthentic){

   const response=await Booking.findOneAndUpdate({
    transactionid:req.body.razorpay_order_id
   },{bookingstatus:true},{new:true})
 console.log(response);
  
  const admid="64017e657109a4dfa6c1abc4"
 
const Admin=await admin.updateOne({_id:admid},{$inc:{salary:100}})

res.status(200).json({success:"true"})
}else{
  throw new Error("Invalid order")
}

  }catch(error){
    console.log(error.message)
res.status(400).json(error.message)
  }

}



const cancelOrder=async(req,res)=>{
const {id}=req.body
try{
const response=await Booking.findOneAndUpdate({_id:id},{bookingstatus:false})
res.status(200).json()
}catch(error){
res.status(400).json(error.message)
}
}

module.exports = {
  loginUser,
  registerUser,
  passwordRequest,
  resetPassword,
  otpVerification,
  resendOtp,
  workerfetch,userProfile,updateProfile,book,Bookings,payment,keyGet,paymentverify,cancelOrder
};
