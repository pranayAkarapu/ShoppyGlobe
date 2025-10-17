import orderModel from "../models/orderModel.js";
import userModel from "../models/UserModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

// global variables
const currency = 'inr';
const deliveryCharge = 50;

// gateway intialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 

//Placing order using COD Method

const placeOrder = async(req, res)=>{
    try {
        const {userId, items, amount, address} = req.body;
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, {});
        res.json({success: true, message: "Order Placed Successfully"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

// Placing order using Stripe Method 

const placeOrderStripe = async(req, res)=>{
    try {
        const {userId, items, amount, address} = req.body;
        const {origin} = req.headers;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: true,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, {});
        res.json({success: true, message: "Order Placed Successfully"})

        /*const line_items = items.map((item)=>({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.max(item.price * 100, 5000),
            },
            quantity: item.quantity
        }))
        
        line_items.push({
            price_data:{
                currency: currency,
                product_data:{
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?canceled=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment'
        })

        res.json({success: true, session_url: session.url})*/
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

// Verify Stripe

const verifyStripe = async(req, res)=>{
    const {orderId, success} = req.body;
    try {
        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            await userModel.findByIdAndUpdate(userId, {cartData: {}})
            res.json({success: true,})
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success: false})
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

// placing order using Razorpay Method

const placeOrderRazorpay = async(req, res)=>{
    try {
        const {userId, items, amount, address} = req.body;
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Razorpay",
            payment: true,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, {});
        res.json({success: true, message: "Order Placed Successfully"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

// All Orders data for Admin Panel

const allOrders = async(req, res)=>{
    try {
        const orders = await orderModel.find({});
        res.json({success: true, orders}); 
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

// User Order Data for Frontend

const userOrders = async(req, res)=>{
    const {userId} = req.body;
    try{
        const orders = await orderModel.find({userId});
        res.json({success:true, orders});
    }catch(error){
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

// update order status from Admin Panel

const updateStatus = async(req, res)=>{
    try {
        const {orderId, status} = req.body;
        await orderModel.findByIdAndUpdate(orderId, {status});
        res.json({success: true, message: "Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}
 
export {verifyStripe, placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus};