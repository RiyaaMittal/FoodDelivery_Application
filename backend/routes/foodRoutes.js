import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodControllers.js';
import multer from 'multer';//using multer we will make our image storage system

//create our express router

const foodRouter= express.Router();

//image storage engine
const storage=multer.diskStorage({
    destination:"uploads",//destination folder in which you want to store
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`);//with this everytime our file name will be unique
    }

})
const upload=multer({storage:storage});//this upload middleware is created using this we can store imges in upload folder

foodRouter.post("/add",upload.single("image"),addFood);
foodRouter.get("/list",listFood);
foodRouter.post("/remove",removeFood);

//logic so that the image uplaods in our uploads folder




export default foodRouter;