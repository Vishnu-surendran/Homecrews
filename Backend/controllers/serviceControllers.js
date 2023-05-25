const Service = require("../models/services");
const mongoose = require("mongoose");

const categoryModel = require("../models/categoryModel");

//GET all services
const allServices = async (req, res) => {

  const services = await Service.find({}).sort({ createdAt: -1 });
  res.status(200).json(services);
};

//GET single services
const singleService = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "no such workouts" });
  }
  const findService = await Service.findById(id);
  if (!findService) {
    return res.status(400).json({ error: "no such service" });
  }
  res.status(200).json(findService);
};

//POST a new service
const createService = async (req, res) => {
 
  //creating a new doc
  const { name, experience, category, description } = req.body;
  try {
    const servicexist=await Service.findOne({name: { $regex: new RegExp(name),$options:"i"} })
    if(servicexist){
      throw new Error("Service already exist")
    }
    const service = await Service.create({
      name,
      experience,
      category,
      description,
      image: req.file.filename,
      isUnlisted: null,
    });
   
    res.status(200).json(service);
   
 
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
};

//Update service
const updateService = async (req, res) => {
  const { id } = req.params;

  const{name,experience,category,description}=req.body

;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "no such workouts" });
  }

  try{
    const updateservice = await Service.findOneAndUpdate(
      { _id: id },
      {name:name,experience:experience,category:category,description:description },
      { new: true }
   
    )
    res.status(200).json(updateservice)
  }catch(error){
    console.log(error.message)
  }
 

};

//DELETE a service
const unlistService = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "no such services" });
  }
  const servicecheck=await Service.findOne({_id:id})
  const status=servicecheck.isUnlisted
  const service = await Service.findOneAndUpdate({ _id: id },{isUnlisted:!status});
  if (!service) {
    return res.status(400).json({ error: "no such service" });
  }
  res.status(200).json(service);
};








const addCategory = async (req, res) => {
  const name = req.body.data;
  try {
    const categoryexist=await categoryModel.findOne({name: { $regex: new RegExp(name),$options:"i"} })
    if(categoryexist){
      throw new Error("Category already exist")
    }
    const response = await categoryModel.create({ name: name ,isUnlisted:false});
  
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const unlistcategory = async (req, res) => {
  const { id } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "no such categories" });
  }
  const categorycheck=await categoryModel.findOne({_id:id})
  const status=categorycheck.isUnlisted
  const category = await categoryModel.findOneAndUpdate({ _id: id },{isUnlisted:!status});
  if (!category) {
    return res.status(400).json({ error: "no such categories" });
  }
  res.status(200).json(category)
};

const editCategory = async (req, res) => {

  const {name,id}=req.body
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "no such categories" });
  } else{
    try{
      const categorycheck=await categoryModel.findOne({_id:id})
      const status=categorycheck.isUnlisted
      const category = await categoryModel.findOneAndUpdate({ _id: id },{name:name});
      res.status(200).json(category)
    }catch(error){
     res.status(400).json(error.message);
    }
  }
 
};


const deleteCategory = async (req, res) => {
  const {id}=req.params
  try {
    const response = await categoryModel.deleteOne({_id:id})

    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ err: "Could not delete category" });
  }
};

const allCategory = async (req, res) => {
  try {
    const response = await categoryModel.find();
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ err: "Unable to find category" });
  }
};

module.exports = {
  createService,
  allCategory,
  allServices,
  singleService,
  unlistService,
  updateService,
  addCategory,deleteCategory,editCategory,unlistcategory
};
