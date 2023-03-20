const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const Workerschema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  aboutme: {
    type: String,
  },
  isBlocked: {
    type: Boolean,
    required: true,
  },
  worksDone: {
    type: Number,
    required: true,
  },works:{
    type:Array
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  isApproved: {
    type: Boolean,
    required: true,
  },
  ismobileVerified: {
    type: Boolean,
    required: true,
  },
  isemailVerified: {
    type: Boolean,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
  },
  Message: {
    type: String,
  },
  warning: {
    type: String,
  },
  image: {
    type: String,
  },
  service: {
    type: String,
    required: true,
  },applicationstatus:{
    type:Boolean,
    required:true
  },admmessage:{
type:String,
  }
});


Workerschema.statics.register = async function (
  name,
  email,
  password,
  age,
  gender,
  job,
  phone,
  otp,
  image,
  service,address
) {
  const exist = await this.findOne({ email });
  if (exist) {
    throw Error("Email already in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const worker = await this.create({
    name,
    email,
    password: hash,
    phone,
    age,
    gender,
    job,
    isBlocked: false,
    worksDone: "0",
    isActive: false,
    isemailVerified: true,
    ismobileVerified: false,
    isVerified: false,
    isApproved: false,
    otp: otp,
    image: image,
    service: service,
    address:address,
    applicationstatus:false

  });
  return worker;
};
Workerschema.statics.login = async function (email, password) {
  const worker = await this.findOne({ email });
  if (!worker) {
    throw Error("user does not exist");
  }
  const match = bcrypt.compare(password, worker.password);
  if (!match) {
    throw Error("password do not match");
  }
  return worker;
};

module.exports = mongoose.model("worker", Workerschema);
