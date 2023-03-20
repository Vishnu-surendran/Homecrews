const express=require('express')

const router=express.Router()
const {authorize}=require("../middlewares/authorization")
const {allServices}=require('../controllers/serviceControllers')
const {workerfetch,cancelOrder,paymentverify,keyGet,payment,book,Bookings,userProfile,updateProfile,loginUser,registerUser,passwordRequest,resetPassword,otpVerification,resendOtp} =require('../controllers/userControllers')

router.post('/register',registerUser)

router.post('/login',loginUser)

router.post("/forgotpassword",passwordRequest)
router.post("/paymentverification",paymentverify)
router.post("/resetpassword",resetPassword)
router.post("/resendotp",resendOtp)
router.post("/bookings",Bookings)
router.post("/otpverify",otpVerification)
router.post("/payment",payment)

router.use(authorize)
router.post("/book",book)
router.get("/bookings",Bookings)

router.get('/services',allServices)
router.get('/workers/:id',workerfetch)
router.get("/getkey",keyGet)
router.patch("/cancel",cancelOrder)
router.get("/profile",userProfile)
router.patch("/profile/update/",updateProfile)
module.exports=router