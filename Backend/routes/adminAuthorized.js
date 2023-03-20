const express=require("express")
const router=express.Router()
const {login,Allusers,blockUser,declineWorker,approveWorker,getBookings}=require("../controllers/adminControllers")
const {adminAuthorize}=require('../middlewares/authorization')
const {allServices,editCategory,unlistcategory,addCategory,allCategory,deleteCategory}=require("../controllers/serviceControllers")
const {allWorkers,blockWorker,ApproveWorker}=require("../controllers/Workercontrollers")

router.use(adminAuthorize)

router.get("/users",Allusers)
router.get("/users/block/:id",blockUser)
router.get("/services",allServices)
router.get("/workers",allWorkers)
router.get("/worker/block/:id",blockWorker)
/* router.get("/worker/approve/:id",ApproveWorker) */
router.get("/bookings",getBookings)
router.post("/addcategory",addCategory)
router.get("/category",allCategory)
/* router.delete("/category/:id",deleteCategory) */
router.patch("/worker/approve",approveWorker)
router.patch("/worker/:id",declineWorker)
router.patch("/category/",unlistcategory)
router.patch("/category/edit",editCategory)
module.exports=router