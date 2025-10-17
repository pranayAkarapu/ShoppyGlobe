import validator from "validator";
import userModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

// JWT authentication

function createToken(id){
    return jwt.sign({id}, process.env.JWT_SECRET_KEY);
}

//Route for user login
const loginUser = async(req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success: false, message:"User does not exists"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            const token = createToken(user._id);
            res.json({success: true, token});
        }else{
            return res.json({success:false, message:"Incorrect password"});
        }
    } catch (error) {
        console.error(error);
        res.json({success: false, message: error.message});
    }
}

// Route for user registration
const  registerUser = async(req, res)=>{
    try {
        const {name, email, password} = req.body;

        const exists = await userModel.findOne({email});
        if(exists){
            res.json({success: false, message:"User already exists"});
        }

        if(!validator.isEmail(email)){
            res.json({success: false, message:"Please enter a valid email"});
        }

        if(password.length < 8){
            res.json({success: false, message:"Password must contain 8 characters"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();

        const token = createToken(user._id);
        res.json({success: true, token})

    } catch (error) {
        console.error(error);
        res.json({success: false, message: error.message});
    }
}

// Route for admin login
const adminLogin = async(req, res)=>{
    try {
        const {email, password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign({email}, process.env.JWT_SECRET_KEY);
            res.json({success:true, token})
        }else{
            res.json({success:false, message:"Invalid credentials"});
        }
    } catch (error) {
        console.error(error);
        res.json({success: false, message: error.message});
    }
}

export {loginUser, registerUser, adminLogin};