import { createContext, useEffect } from "react"
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL, backendUrl } from "../Utilities/apiPath";


export const ShopContext = createContext();

export const ShopContextProvider = (props) => {

    const currency = "₹";
    const deliver_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();
    const [token, setToken] = useState('')


    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Select Product Size");
            return
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {
                    console.error(error)
                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {
            const response = await API_URL.get('/api/product/list')
            if (response.data.success) {
                return response.data.products;
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const { data: products = [] } = useQuery({
        queryKey: ["ProductsData"],
        queryFn: getProductsData,
        staleTime: 10 * 60 * 1000,
        cacheTime: 30 * 60 * 1000
    });

    useEffect(() => {

        /*if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }*/
        if (token) {
            getUserCart(token);
        }
        else if (!token && localStorage.getItem('token')) {
            const localToken = localStorage.getItem('token');
            setToken(localToken);
            getUserCart(localToken);
        }
    }, [token])


    const value = {
        products,
        currency,
        deliver_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        setToken,
        token
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
