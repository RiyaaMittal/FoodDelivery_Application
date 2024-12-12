import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt, { genSalt } from "bcrypt"
import validator from "validator"

//login user
const loginUser= async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"user doesnt exists"});
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Wrong credentials"});
        }

        const token=generateToken(user._id);
        res.json({success:true,token});
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"error"});

    }

}

//regiter user

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}

const registerUser= async (req,res)=>{
    const {name,email,password}=req.body;
    try{
        const exists= await userModel.findOne({email});
        if(exists){
           return res.json({success:false,message:"user already exists"});
        }

        //validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"});
        }
        if(password.length<8){
            return res.json({success:false,message:"Please enter a string password"});
        }

        //hashing password
        const salt=await genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newuser=new userModel({
            name:name,
            email:email,
            password:hashedPassword
        });
        const user=await newuser.save();
        const token=generateToken(user._id);
        res.json({success:true,data:{user,token}});

    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"error"});
    }

}

export {loginUser,registerUser};