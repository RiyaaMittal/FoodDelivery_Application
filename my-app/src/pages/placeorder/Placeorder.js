import React, { useContext, useEffect, useState } from 'react'
import './Placeorder.css'
import { Storecontext } from '../../context/Storecontext'
import axios from 'axios';
import {useNavigate } from 'react-router-dom'


const Placeorder = () => {
    const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(Storecontext);
    const navigate=useNavigate();

    const [data,setdata]=useState({
        firstName:"",
        lastName:"",
        email:"",
        street:"",
        city:"",
        state:"",
        zipcode:"",
        country:"",
        phone:"",
    });

    const onChangeHandler=(event)=>{
        let name=event.target.name;
        let value=event.target.value;

        setdata((data)=>({...data,[name]:value}));
    }

    // useEffect(()=>{
    //     console.log(data);
    // },[data]);

    useEffect(()=>{
        if(!token){
            navigate('/cart');
        }
        else if(getTotalCartAmount()===0){
            navigate('/cart');
        }
    },[token])


    const placeOrdr= async (e)=>{
        e.preventDefault();
        let orderItems=[];
        food_list.map((item)=>{
            if(cartItems[item._id]>0){
                let iteminfo=item;
                iteminfo["quantity"]=cartItems[item._id];
                orderItems.push(iteminfo);
            }
        });
        if(token){
        //console.log(orderItems);

        let orderData={
            address:data,
            items:orderItems,
            amount:getTotalCartAmount()+2,
        }
        let response= await axios.post(url+"/api/order/place",orderData,{headers:{token}});
       // if(response.data.success){
            console.log(response.data.message);
            console.log(response.data);
            //you have to make another component for verify in future but for noew i am just using here only
            //or this verify you can use on any button click further while doing/integrating payments
            let res2=await axios.post(url+"/api/order/verify",
                {success:response.data.success,orderId:response.data.orderId},{headers:{token}});
            console.log(res2.data.message);
            if(res2.data.success){
                navigate('/myorders');
            }
            else{
                navigate('/');
            }
       // }


        }
        else{
            console.log("please login to order");
        }

    }


  return (
    <form className='place-order' onSubmit={placeOrdr}>
        <div className='place-order-left'>
            <p className='title'>Delivery Information</p>
            <div className='multi-fields'>
                <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type='text' placeholder='First name' />
                <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type='text' placeholder='Last name' />
            </div>
            <input required name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Email' />
            <input required name='street' onChange={onChangeHandler} value={data.street} type='text' placeholder='Street' />
            <div className='multi-fields'>
                <input required name='city' onChange={onChangeHandler} value={data.city} type='text' placeholder='City' />
                <input required name='state' onChange={onChangeHandler} value={data.state} type='text' placeholder='State' />
            </div>
            <div className='multi-fields'>
                <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type='text' placeholder='Zip code' />
                <input required name='country' onChange={onChangeHandler} value={data.country} type='text' placeholder='Country' />
            </div>
            <input required name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone' />
        </div>

        <div className='place-order-right'>
            <div className='cart-total'>
            <h3>Cart Totals</h3>
            <div>
                <div className='cart-total-details'>
                <p>Subtotal</p>
                <p>{getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className='cart-total-details'>
                <p>Delivery fees</p>
                <p>{2}</p>
                </div>
                <hr />
                <div className='cart-total-details'>
                <b>Total</b>
                <b>INR {getTotalCartAmount()+2}</b>
                </div>
            </div>
            <button type='submit'>Proceed to Pay</button>
            </div>

        </div>

    </form>
  )
}

export default Placeorder;