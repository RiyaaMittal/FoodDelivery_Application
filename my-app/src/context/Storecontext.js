import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios";

export const Storecontext = createContext(null);

const StoreContextProvider=(props)=>{

    let [cartItems,setCartItems]=useState({});
    let [token,settoken]=useState("");
    const url="http://localhost:4000";
    const [food_list,setfoodlist]=useState([]);

    const addToCart= async (itemId)=>{
        if(!cartItems?.[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}));
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));

        }

        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
        }

    }

    const removeFromCart= async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
        }
        /*
        if(cartItems[itemId]===1){
            delete cartItems[itemId];
            setCartItems((prev)=>(cartItems));
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        }*/
    }

    const getTotalCartAmount=()=>{
        let amount=0;
        for(const item in cartItems){
            if( cartItems[item]>0){
                const product=food_list.find((pr)=>pr._id===item);
                if(product){
                amount+=(product.price*cartItems[item]);
                }
            }
        }
        return amount;
    }

    const fetchfoodlist= async ()=>{
        const response=await axios.get(url+"/api/food/list");
        setfoodlist(response.data.data);

    }

    const loadCartData= async(token)=>{
        let response=await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData);

    }

    // useEffect(()=>{
    //     console.log(cartItems);

    // },[cartItems]);
    useEffect(()=>{
        async function loaddata(){
            if(localStorage.getItem("token")){
                settoken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));//as we want our cart remain same when page reloads also so thsts why here
            }
            await fetchfoodlist();
        }
        loaddata();

    },[])


    const contextvalue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        settoken
    };
    return(
        <Storecontext.Provider value={contextvalue}>
            {props.children}
        </Storecontext.Provider>

    )

}
export default StoreContextProvider;
