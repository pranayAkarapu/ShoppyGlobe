import jwt from "jsonwebtoken";

const adminAuth = async(req, res, next)=>{
    try {
        const token = req.headers.token;
        if(!token){
            return res.json({success:false, message:"Unauthorized Access"})
        }
        
        const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(token_decode.email !== process.env.ADMIN_EMAIL){
            return res.json({success:false, message:"Unauthorized Access, Login Again"})
        }
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }
}
export default adminAuth;