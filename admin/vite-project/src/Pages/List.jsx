import React, { useEffect } from "react";
import { API_URL } from "../utilities/ApiPath";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { currency } from "../App";


const List = ({ token }) => {
  const queryClient = useQueryClient();

  const ProductList = async () => {
    try {
      const response = await API_URL.get("/api/product/list");
      if (!response.data.success) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }
      return response.data.products;
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went Wrong!");
    }
  };

  const {
    data: list = [],
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["list"],
    queryFn: ProductList,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });

  useEffect(() => {
    let toastId;
    if (isLoading) {
      toastId = toast.loading("Fetching products... ⏳", {
        position: "top-center",
      });
    } else {
      toast.dismiss();
    }
    return () => {
      if (toastId) toast.dismiss(toastId);
    };
  }, [isLoading, isFetching]);

  if (error) {
    toast.error(error.message || "Failed to load products");
    return <p className="text-red-500">Error fetching products</p>;
  }

  const removeProduct = async (id) => {
    const response = await API_URL.delete("/api/product/remove", { data: { id }, headers: { "token": token } })
    return response.data;
  }

  const RemoveMutation = useMutation({
    mutationFn: removeProduct,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message)
        queryClient.invalidateQueries({ queryKey: ["list"] })
      } else {
        toast.error(data.message)
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message)
    }
  });

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      RemoveMutation.mutate(id);
    }
  }

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>
        {/* Product List */}
        {
          list.map((item, index) => (
            <div className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-300 text-sm" key={index}>
              <img src={item.image[0]} alt="" className="w-12" />
              <p>{item.name}</p>
              <p className="mx-6">{item.category}</p>
              <p className="">{currency}{item.price}</p>
              <p onClick={() => handleRemove(item._id)} className="px-6 mx-6 text-white  hover:bg-gray-800 rounded-md md:text-center cursor-pointer text-lg bg-black w-24" >Delete</p>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default List;

{/*<div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6 text-center">
        All Products List
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {list.length > 0 ? (
              list.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-700 hover:bg-gray-800 transition duration-200"
                >
                  <td className="px-6 py-3">
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg shadow-md"
                    />
                  </td>
                  <td className="px-6 py-3">{item.name}</td>
                  <td className="px-6 py-3">{item.category}</td>
                  <td className="px-6 py-3 font-semibold">
                    {currency}
                    {item.price}
                  </td>
                  <td className="px-6 py-3">
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95"
                      onClick={() => handleRemove(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-400 italic"
                >
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>*/}