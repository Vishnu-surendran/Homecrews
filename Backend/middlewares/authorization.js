const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const admin = require("../models/AdminModel");
const worker = require("../models/Workermodel");
const { response } = require("express");
const adminAuthorize = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
   
    return res.status(400).json({ error: "Unauthorized access" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    const Admin = await admin.findOne({ _id: _id }).select("_id");

    req.admin = Admin._id;

    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Token is not valid" });
  }
};

const authorize = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Unauthorized access" });
  }
  const token = authorization.split(" ")[1];

  try {
   
    const { _id } = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ _id: _id });
    if (user.isBlocked) {
      return res.status(401).json({ err: "User has been blocked" });
    }
   
    req.user=_id
 
    next();
  } catch (error) {
    console.log("no access");
    res.status(401).json(error.message);
  }
};

const workerAuthorize = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Unauthorized access" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    const Workerdetails = await worker.findOne({ _id: _id });
    req.Worker = Workerdetails._id;
    next();
  } catch (error) {
    console.log("no access");
    res.status(401).json({ error: "Invalid token" });
  }
};
module.exports = { authorize, adminAuthorize, workerAuthorize };
