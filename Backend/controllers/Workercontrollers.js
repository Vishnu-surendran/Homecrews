const worker = require("../models/Workermodel");
const jwt = require("jsonwebtoken");
const duties = require("../models/dutymodel");
const nodemailer = require("nodemailer");
const dutymodel = require("../models/dutymodel");
const otpGenerator = require("otp-generator");
const messages=require("../models/messageModel")
const Booking=require("../models/Bookingmodel")
const bcrypt=require("bcrypt");
const Response = require("twilio/lib/http/response");
const Bookingmodel = require("../models/Bookingmodel");
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "2d" });
};

const register = async (req, res) => {
  console.log(req.body)
  const { name, email, password, age, gender, job, phone,service,address } = req.body;
 
  const otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  try {
    const image = req.file.filename;
    const workerRegister = await worker.register(
      name,
      email,
      password,
      age,
      gender,
      job,
      phone,
      otp,
      image,service,address
    );

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

    const workerToken = await createToken(workerRegister._id);
    res.status(200).json({ id: workerRegister._id, token: workerToken });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ err: "cannot register" });
  }
};

const resendOtp = async (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  const otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  try {
    const workerotp = await worker.findByIdAndUpdate({ _id: id }, { otp: otp });
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
        to: workerotp.email,
        subject: "Signup otp",
        text: `Your otp for signinig is ${otp}`,
      });
    }
    main();
    res.status(200).json({ message: "Otp has been successfully send" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "worker not found" });
  }
};

const otpVerification = async (req, res) => {
  const { otp, id } = req.body;
  try {
    const workerverify = await worker.findById({ _id: id });
    if (workerverify.otp === otp) {
      res.status(200).json({ message: "otp verification successfull" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: "otp verification failed" });
  }
};

const loginWorker = async (req, res) => {
  const { email, password } = req.body;
  try {
    const workerLogin = await worker.login(email, password);
    const workerToken = await createToken(workerLogin._id);
    res.status(200).json({ id: workerLogin._id, token: workerToken });
  } catch (err) {
    res.status(400).json({ err: "could not login" });
  }
};

const allWorkers = async (req, res) => {
  try {
    const workers = await worker.find();
    res.status(200).json(workers);
  } catch (err) {
    res.status(400).json({ message: "could not gett workerdata" });
  }
};

const singleWorker = async (req, res) => {
  console.log("1");
  const singleWorker = await worker.findById({ _id: req.Worker });
  res.status(200).json(singleWorker);
};

const editProfile = async (req, res) => {
  console.log(req.body);
  const { name, email, phone, age, job, address, about } = req.body;
  try {
    const response = await worker.updateOne(
      { _id: req.Worker },
      {
        name: name,
        email: email,
        phone: phone,
        age: age,
        job: job,
        address: address,
        aboutme: about,
        image: req.file.filename,
      }
    );
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ err: "could not update profile" });
  }
};

const blockWorker = async (req, res) => {
  const workerId = req.params.id;
  try {
    const workerStatus = await worker.findById({ _id: workerId });
    const status = !workerStatus.isBlocked;
    const workerBlock = await worker.updateOne(
      { _id: workerId },
      { isBlocked: status }
    );
    res.status(200).json(workerBlock);
  } catch (err) {
    res.status(400).json({ message: "couldn't block worker" });
  }
};
const ApproveWorker = async (req, res) => {
  const workerId = req.params.id;
  try {
    const workerBlock = await worker.updateOne({ _id: workerId }, {});
    res.status(200).json(workerBlock);
  } catch (err) {
    res.status(400).json({ message: "couldn't approve worker" });
  }
};

const addDuty = async (req, res) => {
  const { timefrom, timeto, id } = req.body;
  try {
    const duty = await dutymodel.create({
      workerid: id,
      timefrom: timefrom,
      timeto: timeto,
    });
    res.status(200).json(duty);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "cannot add duty" });
  }
};

/* const getDuty = async (req, res) => {
 const id= req.Worker
  try {
    const duty = await dutymodel.findOne({workerid:id})
    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "cannot add duty" });
  }
}; */




const passwordRequest = async (req, res) => {
  const { email } = req.body;
  try {
    const workerexist = await worker.findOne({ email: email });
    const token = createToken(workerexist._id);
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
        text: `Your link for resetting password has been given below.http://localhost:3000/worker/resetpassword/${token}`,
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

    const changePassword = await worker.updateOne(
      { _id: _id },
      { password: hash }
    );
    res.status(200).json(changePassword);
  } catch (err) {
    res.status(400).json({ err: err });
  }
};


const reapplication=async(req,res)=>{
  const id=req.Worker
  const{message}=req.body
try{
  const update=await worker.findOneAndUpdate({_id:id},{applicationstatus:true,admmessage:message},{new:true})
res.status(200).json(update)
}catch(error){
res.status(400).json({messsage:"Unable to apply"})
}

}


const getbookings=async(req,res)=>{

const id=req.Worker
const workerid=id.toString()


try{
const response= await Booking.find({customerid:"64001a74e73cd7daba3f2f75"})
console.log(response);
res.status(200).json(response)
}catch(error){
res.status(400).json(error.message)
}
}


const cancelOrder=async(req,res)=>{
 
  const {id}=req.body
  try{
  const response=await Bookingmodel.findOneAndUpdate({_id:id},{bookingstatus:false})
  const data=await Bookingmodel.find()

  res.status(200).json(data)
  }catch(error){
  res.status(400).json(error.message)
  }
  }
  



module.exports = {
  addDuty,
  register,
  allWorkers,
  blockWorker,
  ApproveWorker,
  loginWorker,
  singleWorker,
  editProfile,
  resendOtp,
  otpVerification,reapplication,resetPassword,passwordRequest,getbookings,cancelOrder
};
