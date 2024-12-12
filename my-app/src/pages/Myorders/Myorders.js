import React, { useContext, useEffect, useState } from 'react'
import { Storecontext } from '../../context/Storecontext';
import './Myorders.css'
import axios from 'axios';

const Myorders = () => {

    const {url,token} = useContext(Storecontext);

    const [data,setdata]= useState([]);

    const fetchdata= async ()=>{
        const res= await axios.post(url+"/api/order/userorders",{},{headers:{token}});
        setdata(res.data.data);
        console.log(res.data.data);
    }

    useEffect(()=>{
        if(token){
            fetchdata();
        }
    },[token])
    

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className='container'>
        {
          data.map((order,index)=>{
            return (<div key={index} className='my-orders-order'>
              {!(order.status === "Delivered")?
              <img  src="https://img.freepik.com/premium-psd/3d-illustration-shipping-packages-with-delivery-box_940959-333.jpg" alt="" />
              :<img  src="https://static.vecteezy.com/system/resources/previews/006/419/310/original/shipping-icon-with-checkmark-3d-icon-vector.jpg" alt="" />
              }
              <p>{order.items.map((item,index)=>{
                    if(index === order.items.length-1){
                      return item.name+" x "+item.quantity
                    }
                    else{
                      return item.name+" x "+item.quantity+", "
                    }

              })}</p>
              <p>INR ${order.amount}</p>
              <p>Items:{order.items.length}</p>
              <p> <span>&#x25cf;</span> <b>{order.status}</b> </p>
              <button onClick={fetchdata}>Track Order</button>
              </div>)

          })
        }

      </div>

    </div>
  )
}

export default Myorders;