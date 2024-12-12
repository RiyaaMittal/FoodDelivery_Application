import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';
const List = () => {
  const url="http://localhost:4000";
  const [list,setlist]=useState([]);

  const fetchlist=async ()=>{
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data);
    if(response.data.success){
      setlist(response.data.data);
    }
    else{
      toast.error("Error");
    }
  }

  const removeFood=async (foodId)=>{
    //console.log(foodId);
    const response=await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchlist();
    if(response.data.success){
      toast.success(response.data.message);
    }
    else{
      toast.error("error");
    }
  }

  useEffect(()=>{
    fetchlist();
  },[])


  return (
    <div  className='list add flex-col'>
      <p>All Foods List</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        <hr/>
        {list.map((item,index)=>{
          return (
            <div>
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
            </div>
            <hr />
            </div>
          )
        })}

      </div>

    </div>
  )
}

export default List