import {v2 as cloudinary} from "cloudinary";
import productModel from "../models/ProductModel.js";

//function to add product
/*const addProduct = async(req, res)=>{
    try {
        const {name, description, price, category, subCategory, sizes, bestseller} = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item)=> item !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async(file)=>{
                let result = await cloudinary.uploader.upload(file.path,{resource_type: "image"});
                return result.secure_url;
            })
        )
        
        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true"? true: false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now(),
        }

        console.log(productData)

        const product = new productModel(productData);
        await product.save();
        res.json({success:true, message:"Product Added Successfully" });
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }
}*/

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    // Each file is in memory buffer now
    const images = [
      req.files.image1 && req.files.image1[0],
      req.files.image2 && req.files.image2[0],
      req.files.image3 && req.files.image3[0],
      req.files.image4 && req.files.image4[0],
    ].filter(Boolean);

    // Upload to Cloudinary using buffer
    const imagesUrl = await Promise.all(
      images.map(async (file) => {
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(file.buffer); // ✅ send buffer data
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true",
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added Successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//fuction to get all products
const getAllProducts = async(req, res)=>{
    try {
        const products = await productModel.find({});
        res.json({success:true, products});
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }
}

//function to remove product
const removeProduct = async(req, res)=>{
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Product removed successfully"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }
}

//function to get single product info
const singleProduct = async(req, res)=>{
    try {
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({success:true, product});

    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }
}

export {addProduct, getAllProducts, removeProduct, singleProduct}