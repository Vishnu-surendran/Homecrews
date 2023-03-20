const express=require("express")
const router=express.Router()
const adminmodel=require("../models/AdminModel")
const {login,Allusers,blockUser}=require("../controllers/adminControllers")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")


router.post("/",login)
router.post("/register",(async(req,res)=>{
    const { email, password } = req.body;
  try {
    const salt=await bcrypt.genSalt(10)
const hash=await bcrypt.hash(password,salt)
    const admin = await adminmodel.create({email:email,password:hash})
    res.status(200).json(admin);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "user not found" });
  }
}))
router.get("/:id",blockUser)



module.exports=router