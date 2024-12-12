//to decode the token so that we can verify or authenticate 
import jwt from 'jsonwebtoken'

const authMiddleware= async (req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.json({success:false,message:"Not Authorized Login again"});
    }
    try{
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);//this will give us the id through which token is created i.e user id for this token
        req.body.userId=token_decode.id;
        next();

    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"error"});

    }

}

//this middleware takes the token and convert it into user id and 
//using that uerId we can perform that functions of add ,remove and get the data from cart

export default authMiddleware;