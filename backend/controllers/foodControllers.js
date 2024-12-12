import foodModel from "../models/foodModels.js";
import fs from 'fs';//fs means file system that is prebuild in nodejs


//add food item

const addFood= async (req,res)=>{
    let image_filename=`${req.file.filename}`;
    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename,
    });

    try{
        await food.save();
        console.log("added into database");
        res.json({success:true,message:"food added"});
    }catch(err){
        console.log(err);
        res.json({success:false,message:"error"});

    }

}

//all food list
const listFood=async (req,res)=>{
    //logic to access all the food items and send as the response
    try{

        const food=await foodModel.find({});
        res.json({success:true,data:food});
    }
    catch(err){
        console.loh(err);
        res.json({success:false,message:"error"});
    }

};

//remove food item 
const removeFood=async (req,res)=>{
    try{

        const food=await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{});//this will delete that image from our folder uploads

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"food removed"});
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"error"});
    }

}

export {addFood,listFood,removeFood};//using this function we will make our any route 