import React, { useState } from 'react'
import { assets } from "../assets/assets.js"
import { API_URL } from '../utilities/ApiPath.js';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);

  const handleImageChange = (index, file) => {
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

  const AddProduct = async (formData) => {
    const response = await API_URL.post("/api/product/add", formData, { headers: { "token": token } });
    return response.data
  }

  const addProductMutation = useMutation({
    mutationFn: AddProduct,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        setName("");
        setDescription("")
        setImages([null, null, null, null]);
        setPrice("");
        setBestseller(false);
        setCategory("Men");
        setSubCategory("Topwear");
        setSizes([]);
      } else {
        console.log(error);
        toast.error(error.message)
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    }
  })

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      images.forEach((img, i) => {
        if (img) {
          formData.append(`image${i + 1}`, img);
        }
      })
      addProductMutation.mutate(formData);
    } catch (error) {
      console.error(error.message)
    }
  }

  const isFormValid =
    name.trim() !== "" &&
    description.trim() !== "" &&
    price.trim() !== "" &&
    sizes.length > 0 &&
    images.some((img) => img !== null);

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2 '>
          {images.map((img, i) => (
            <div key={i} className="">
              <label htmlFor={`image${i}`}>
                <img
                  className='w-20 height-20 object-cover cursor-pointer'
                  src={img ? URL.createObjectURL(img) : assets.upload_area}
                  alt=""
                />
                <input
                  type="file"
                  id={`image${i}`}
                  hidden
                  onChange={(e) => handleImageChange(i, e.target.files[0])}
                />
              </label>


              {images[i] && (
                <button
                  type="button"
                  onClick={() => handleRemoveImage(i)}
                  className="absolute top-1 right-1 cursor-pointer bg-red-600 text-white rounded-full p-1 text-xs hover:bg-red-700"
                >
                  X
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className='w-full'>
        <p>Product Name</p>
        <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder='Enter Product Name' required className='w-full max-w-[500px] px-3 py-2' />
      </div>

      <div className='w-full'>
        <p>Product Description</p>
        <textarea type="text" onChange={(e) => setDescription(e.target.value)} value={description} placeholder='Type Here' required className='w-full max-w-[500px] px-3 py-2' />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2 '>Product Category</p>
          <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2 cursor-pointer'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-2 '>Sub Category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2 cursor-pointer'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Product Price</p>
          <input type="Number" onChange={(e) => setPrice(e.target.value)} placeholder='25' className='w-full px-3 py-2 sm:w-[120px]' />
        </div>
      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
            <p className={`${sizes.includes("S") ? "bg-pink-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
            <p className={`${sizes.includes("M") ? "bg-pink-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
            <p className={`${sizes.includes("L") ? "bg-pink-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
            <p className={`${sizes.includes("XL") ? "bg-pink-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
            <p className={`${sizes.includes("XXL") ? "bg-pink-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='besseller' />
        <label htmlFor="bestseller" className='cursor-pointer'>Add to Bestseller</label>
      </div>

      <button type='submit' className={`w-23 py-2 mt-4 text-white rounded-md transition-colors duration-200 ${isFormValid ? 'bg-black hover:bg-gray-800 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
        }`}>ADD</button>
    </form>
  )
}

export default Add

