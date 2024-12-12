import React, { useEffect, useState } from 'react'
import './Orders.css'
import axios from 'axios';
import {toast} from 'react-toastify'
const Orders = () => {
  const url="http://localhost:4000";

  let [orders,setorders]=useState([]);

  const fetchAllorders=async ()=>{
    const response=await axios.get(url+"/api/order/list");
    if(response.data.success){
      setorders(response.data.data);
      console.log(response.data.data);
    }
    else{
      toast.error("error");
    }
  }

  const setstatusHandler=async (event,orderId)=>{
    const response=await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value

    });

    if(response.data.success){
      await fetchAllorders();
    }
    else{
      console.log(response.data.message);
    }

  }

  useEffect(()=>{
    fetchAllorders();

  },[])


  return (
    <div className='order add'>
      <h3>Order page</h3>
      <div className='order-list'>
        {
          orders.map((order,index)=>(
            <div key={index} className='order-item'>
              <img src='https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/platform_truck_box.png' alt='' />
              <div>
                <p className='order-item-food'>
                  {order.items.map((item,index)=>{
                    if(index===order.items.length-1){
                      return item.name+" x "+item.quantity//if it is last item dont add comma at last
                    }
                    else{
                      return item.name+" x "+item.quantity+", "
                    }
                  })}

                </p>
                <p className='order-item-name'>
                  {order.address.firstName+" "+order.address.lastName}
                </p>
                <div className='order-item-address'>
                  <p>{order.address.street}</p>
                  <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
                </div>
                <p className='order-item-phone'>
                  {order.address.phone}
                </p>

                </div>
                <p>Items: {order.items.length}</p>
                <p>INR {order.amount}</p>
                <select onChange={(event)=>{return setstatusHandler(event,order._id)}} value={order.status}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
                
            </div>
          ))
        }

      </div>

    </div>
  )
}

export default Orders