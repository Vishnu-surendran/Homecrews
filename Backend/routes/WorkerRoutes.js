const express=require("express")
const {Chat,getAllmessages,addDuty,cancelOrder,passwordRequest,getbookings,resetPassword,reapplication,register,loginWorker,singleWorker,editProfile,resendOtp,otpVerification}=require("../controllers/Workercontrollers")
const router=express.Router()
const multer=require("multer")
const path=require("path")
const {workerAuthorize}=require("../middlewares/authorization")

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./images/worker")
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload=multer({storage:storage})


router.post("/register",upload.single("file"),register)

router.post("/resendotp",resendOtp)

router.post("/login",loginWorker)

router.post("/otpverify",otpVerification)
router.post("/requestlink",passwordRequest)
router.post("/resetpassword",resetPassword)
router.use(workerAuthorize)
router.get("/worker",singleWorker)
router.post("/editprofile",upload.single("file"),editProfile)
router.post("/addDuty",addDuty)
/* router.get("/duties",getDuty) */
router.get("/bookings",getbookings)
router.patch("/booking/cancel",cancelOrder)
router.post("/reapply",reapplication)
router.post("/message",Chat)
router.get("/allmessages/:id",getAllmessages)
module.exports=router