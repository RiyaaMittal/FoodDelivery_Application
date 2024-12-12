import mongoose from "mongoose";

export const connectDB=async ()=>{
    await mongoose.connect('mongodb+srv://riya1812be21:riya11@cluster0.ds506.mongodb.net/food-del')
    .then(()=>{
        console.log("DB connected");
    });//remove last ques mark and add the project name
}