import React, { useEffect } from "react";
import { API_URL } from "../utilities/ApiPath";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { currency } from "../App";


const List = ({token}) => {
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
    if (isLoading || isFetching) {
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

  const removeProduct = async(id)=>{
    const response = await API_URL.delete("/api/product/remove", {data:{id}, headers:{"token": token}})
    return response.data;
  }

  const RemoveMutation = useMutation({
    mutationFn: removeProduct,
    onSuccess: (data)=>{
      if(data.success){
        toast.success(data.message)
        queryClient.invalidateQueries({ queryKey: ["list"] })
      }else{
        toast.error(data.message)
      }
    },
    onError:(error)=>{
      console.log(error);
      toast.error(error.message)
    }
  });

  const handleRemove = (id)=>{
    RemoveMutation.mutate(id);
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
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
    </div>
  );
};

export default List;

