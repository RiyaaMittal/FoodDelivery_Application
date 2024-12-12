import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import stripe from 'stripe'

//placing user order from frontend

const placeOrder= async (req,res)=>{
    try{
        const newOrder =new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        });
        await newOrder.save();
        //after ordering we want our cart to be emlty so
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
        res.json({success:true,message:"order confirmed",orderId:newOrder._id});

        //create payment link
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"error placing the order"});
    }

}

const verify= async (req,res)=>{
    const {orderId,success}=req.body;
    try{
        if(success==true){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"PAID"});
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:" NOT PAID"});
        }

    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"error"});
    }
}

//user orders for frontend
const userOrders= async(req,res)=>{
    try{
        const orders=await orderModel.find({userId:req.body.userId});//it will find all orders of the user/particular user
        res.json({success:true,data:orders});

    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"error"});
    }
}

//listing orders for admin pannel=i.e all orders placed by all users
const listOrders= async(req,res)=>{
    try{
        const orders= await orderModel.find({});//we will get all the orders in this variable
        res.json({success:true,data:orders});
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"error"});

    }

}

//api for updating order status
const updateStatus= async (req,res)=>{
    try{
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
    res.json({success:true,message:"Status Updated"});
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Status Updated"});
    }

}


export {placeOrder,userOrders,verify,listOrders,updateStatus};