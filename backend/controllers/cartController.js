import userModel from "../models/userModel.js"

const addtoCart= async (req,res)=>{
    try{
        let userdata= await userModel.findOne({_id:req.body.userId});
        let cartData=await userdata.cartData;
        if(!cartData[req.body.itemId]){ //user will sedn token and item id to add that item to cart-token in headers and itemId in nrmal body
            cartData[req.body.itemId]=1;
        }
        else{
            cartData[req.body.itemId]+=1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData});//updating the user cart/or user
        res.json({success:true,message:"added to cart"});
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"error"});
    }

}

const removefromCart= async (req,res)=>{
    try{
        let userdata= await userModel.findById(req.body.userId); //we got userId with help of middleware
        let cartData=await userdata.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});//updating the user cart/or user
        res.json({success:true,message:"removed from cart"});
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"error"});
    }

}

const getCart= async (req,res)=>{ //for this endpoint api,we just need token of user from headers not itemid in body

    try{
        let userdata= await userModel.findById(req.body.userId); 
        let cartData=await userdata.cartData; //users cart data
        res.json({success:true,cartData});

    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"error"});

    }

}

export {addtoCart,removefromCart,getCart}