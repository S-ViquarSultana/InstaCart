'use client'
import { productsDummyData } from "@/assets/assets";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast';


export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
}

export const AppContextProvider = (props) => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY;
    const router = useRouter();

    const { user } = useUser();
    const { getToken } = useAuth();

    const [products, setProducts] = useState([]);
    const [userData, setUserData] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [cartItems, setCartItems] = useState({});

    const fetchProductData = async () => {
        try {
            const { data } = await axios.get('/api/product/list');

            if (data.success) {
                setProducts(data.products);
            } else {    
                console.error("Error fetching products:", data.message);
                toast.error(data.message);
            }

        } catch (error) {
            console.error("idiot");
            toast.error(error.message || "Something went wrong");
        }
        
    }


    const fetchUserData = async () => {
        try {
            // Check if user and publicMetadata exist before accessing
            if (!user || !user.publicMetadata) {
                console.warn("User or publicMetadata is undefined");
                return;
            }

            if (user.publicMetadata.role === 'seller') {
                setIsSeller(true);
            } else {
                setIsSeller(false);
            }

            const token = await getToken();

            const { data } = await axios.get('/api/user/data', {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("API Response:", data);

            if (data.success) {
                setUserData(data.user);
                setCartItems(data.user.cartItems);
            } else {
                toast.error("baka");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Something went wrong");
        }
    }

    const addToCart = async (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        }
        else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        if (user) {
            try {
                const token = await getToken();
                await axios.post('/api/cart/update', {cartData}, {headers: { Authorization: `Bearer ${token}` }});
                toast.success("Item added to Cart");
            } catch (error) {
                console.error("Error adding to cart:", error);
                toast.error(error.message || "Something went wrong");
            }
        }
    }

    const updateCartQuantity = async (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData);
        if (user) {
            try {
                const token = await getToken();
                await axios.post('/api/cart/update', {cartData}, {headers: { Authorization: `Bearer ${token}` }});
                toast.success("Cart Updated");
            } catch (error) {
                console.error("Error adding to cart:", error);
                toast.error(error.message || "Something went wrong");
            }
        }
    
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                totalCount += cartItems[items];
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (cartItems[items] > 0 && itemInfo) {
                totalAmount += itemInfo.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    useEffect(() => {
            fetchProductData();
    }, []);

    useEffect(() => {
        if (user) {
            fetchUserData();
        }
    }, [user]);

    const value = {
        user, getToken,
        currency, router,
        isSeller, setIsSeller,
        userData, fetchUserData,
        products, fetchProductData,
        cartItems, setCartItems,
        addToCart, updateCartQuantity,
        getCartCount, getCartAmount
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
