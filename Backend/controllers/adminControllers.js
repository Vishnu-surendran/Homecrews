const Admin = require("../models/AdminModel");
const jwt = require("jsonwebtoken");
const users = require("../models/userModel");
const worker = require("../models/Workermodel");
const messages=require("../models/messageModel")
const Booking=require("../models/Bookingmodel")
//create token
const createToken = async (_id) => {
  return (token = await jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: "2d",
  }));
};

//adminlogin
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.login(email, password);
    const adminToken = await createToken(admin._id);
    res.status(200).json({ adminToken });
  } catch {
    res.status(400).json({ error: "cannot create admin" });
  }
};

const Allusers = async (req, res) => {
  console.log(req.headers.authorization);
  try {
    const dbusers = await users.find({}).sort({ name: 1 });
    res.status(200).json(dbusers);
  } catch {
    res.status(400).json({ err: "no users found" });
  }
};

const blockUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const finduser = await users.findById({ _id: userId });
    const status = !finduser.isBlocked;
    const update = await users.updateOne(
      { _id: userId },
      { isBlocked: status }
    );
    res.status(200).json({ update, finduser, status });
  } catch (err) {
    res.status(400).json(err);
  }
};

const declineWorker = async (req, res) => {
  const { id } = req.params;
  const { status, message, warning } = req.body;
  console.log(req.body);
  try {
    const response = await worker.findOneAndUpdate(
      { _id: id },
      { status: status, Message: message, warning: warning, isApproved: false }
    );
    res.status(200).json({ message: "Declined worker" });
  } catch (error) {
    res.status(400).json({ message: "unable to process request" });
  }
};

const approveWorker = async (req, res) => {
  const { id } = req.body;
  try {
    const response = await worker.updateOne(
      { _id: id },
      { status: false, warning: null, isApproved: true,
        applicationstatus:false }
    )
    res.status(200).json({ message: "Approved worker" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "unable to process request" });
  }
}

const getBookings=async(req,res)=>{
  try{
  const bookings=await Booking.find()
  if(bookings.length===0){
    res.status(200).json(null)
  }else{
    res.status(200).json(bookings)
  }
  
  }catch(error){
  res.status(400).json(error.message)
  }
  }



module.exports = {
  login,
  Allusers,
  blockUser,
  declineWorker,
  approveWorker,getBookings
};
