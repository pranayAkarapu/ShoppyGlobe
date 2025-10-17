import React, { useState } from 'react'
import { assets } from "../assets/assets.js"
import { API_URL } from '../utilities/ApiPath.js';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

const Add = ({token}) => {
  const [images, setImages] = useState([null, null, null, null]); 
  const handleImageChange = (index, file)=>{
    const updatedImages = [...images];
    updatedImages[index] = file;
    setImages(updatedImages);
  } 

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages[index] = null;
    setImages(updatedImages);
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  
  
  const handleSizeChange = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const formData = new FormData();

  formData.append("name", name);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("category", category);
  formData.append("subCategory", subCategory);
  formData.append("bestseller", bestseller);
  formData.append("sizes",JSON.stringify(sizes));

  images[0] && formData.append("image1", images[0]);
  images[1] && formData.append("image2", images[1]);
  images[2] && formData.append("image3", images[2]);
  images[3] && formData.append("image4", images[3]);

  const AddProduct = async(e)=>{
    const response = await API_URL.post("/api/product/add", formData, {headers:{"token":token}});
    return response.data
  }

  const addProductMutation = useMutation({
    mutationFn: AddProduct,
    onSuccess: (data)=>{
      if(data.success){
        toast.success(data.message);
        setName("");
        setDescription("")
        setImages([null,null, null, null]);
        setPrice("");
        setBestseller(false);
        setCategory("Men");
        setSubCategory("Topwear");
        setSizes([]);
      }else{
        console.log(error);
        toast.error(error.message)
      }
    },
    onError: (error)=>{
      console.log(error);
      toast.error(error.message);
    }
  })

  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("bestseller", bestseller);
    formData.append("sizes",JSON.stringify(sizes));

    images[0] && formData.append("image1", images[0]);
    images[1] && formData.append("image2", images[1]);
    images[2] && formData.append("image3", images[2]);
    images[3] && formData.append("image4", images[3]);

    addProductMutation.mutate(formData);
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 sm:p-8 space-y-6 w-full max-w-4xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
        Add New Product
      </h2>

      {/* Upload Images */}
      <div>
        <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">Upload Images</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="relative">
              <label
                htmlFor={`image${i}`}
                className="cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 hover:border-red-400 transition relative"
              >
                <img
                  src={images[i] ? URL.createObjectURL(images[i]) : assets.upload_area}
                  alt={`upload${i}`}
                  className="h-16 w-16 object-contain opacity-70"
                />
                <input
                  type="file"
                  id={`image${i}`}
                  hidden
                  onChange={(e) => handleImageChange(i, e.target.files[0])}
                />
              </label>

              {/* Remove Button */}
              {images[i] && (
                <button
                  type="button"
                  onClick={() => handleRemoveImage(i)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs hover:bg-red-700"
                >
                  X
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">Product Name</p>
        <input type="text" onChange={(e)=> setName(e.target.value)} value={name} placeholder="Enter Product Name"
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-400 dark:bg-gray-800 dark:text-white dark:border-gray-700" />
      </div>

      {/* Description */}
      <div>
        <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">Description</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description} placeholder="Write content here..." required
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-400 dark:bg-gray-800 dark:text-white dark:border-gray-700"></textarea>
      </div>

      {/* Category & Subcategory */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">Category</p>
          <select onChange={(e)=> setCategory(e.target.value)} value={category} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700">
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
          </select>
        </div>
        <div>
          <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">Sub Category</p>
          <select onChange={(e)=>setSubCategory(e.target.value)} value={subCategory} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700">
            <option>Topwear</option>
            <option>Bottomwear</option>
            <option>Winterwear</option>
          </select>
        </div>
      </div>

      {/* Price */}
      <div>
        <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">Price</p>
        <input onChange={(e)=>setPrice(e.target.value)} value={price}  type="number" placeholder="Enter Price"
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-400 dark:bg-gray-800 dark:text-white dark:border-gray-700" />
      </div>

      {/* Sizes */}
      <div>
        <p className="font-medium text-gray-700 dark:text-gray-300 mb-3">Sizes</p>
        <div className="flex flex-wrap gap-3">
          {["S", "M", "L", "XL", "XXL"].map(size => (
            <label key={size} className="cursor-pointer">
              <input type="checkbox" onChange={()=>handleSizeChange(size)} checked={sizes.includes(size)} className="hidden peer" />
              <div className="px-4 py-2 border rounded-lg peer-checked:bg-red-500 peer-checked:text-white peer-checked:border-red-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700">
                {size}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className="flex items-center gap-2">
        <input type="checkbox" onChange={()=> setBestseller(prev => !prev)} checked={bestseller} id="bestseller" className="h-4 w-4 text-red-500 focus:ring-red-400 border-gray-300 rounded" />
        <label htmlFor="bestseller" className="text-gray-700 dark:text-gray-300">Add to bestseller</label>
      </div>

      <button 
        type="submit" 
        disabled={addProductMutation.isPending}
        className={`w-full py-3 cursor-pointer rounded-lg font-semibold shadow-md transition
                    ${addProductMutation.isPending 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-red-500 hover:bg-red-600 text-white"}`}
      >
        {addProductMutation.isPending ? "Processing..." : "ADD PRODUCT"}
      </button>
    </div>
    </form>
  )
}

export default Add

