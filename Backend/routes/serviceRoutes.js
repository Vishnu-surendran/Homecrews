const express=require('express')
const {createService,allServices,singleService,unlistService,updateService}=require('../controllers/serviceControllers')
const {authorize} = require('../middlewares/authorization')
const router=express.Router()
const multer=require("multer")
const path=require("path")

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./images/serviceImages")
    },
    filename:(req,file,cb)=>{
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload=multer({storage:storage})

/* router.use(authorize) */
router.get('/',allServices)
router.get('/:id',singleService)
router.post('/',upload.single("image"),createService)
router.patch('/unlist/:id',unlistService)
router.patch('/:id',updateService)
module.exports=router