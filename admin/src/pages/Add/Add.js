import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
const Add = () => {
    const [image,setImage]=useState(false);
    const [data,setdata]=useState({
        name:"",
        description:"",
        price:"",
        category:"Salad"
    });

    const onChangehandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setdata((data)=>({...data,[name]:value}));
    }

    useEffect(()=>{
        console.log(data);
        // toast(`${data.name}`, {
        //     // position: toast.POSITION.BOTTOM_LEFT,
        //      className: "toast-message-custom",
        //    });
    },[data]);

    const onSubmithandler=async (e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append("name",data.name);
        formData.append("description",data.description);
        formData.append("price",Number(data.price));
        formData.append("category",data.category);
        formData.append("image",image);

        const response= await axios.post('http://localhost:4000/api/food/add',formData);
        if(response.data.success){
            console.log(response.data.data);
            setdata({
                name:"",
                description:"",
                price:"",
                category:"Salad"

            });
            setImage(false);
           toast.success(response.data.message);
        //    toast(`${response.data.message}`, {
        //    // position: toast.POSITION.BOTTOM_LEFT,
        //     className: "toast-message",
          //});
        }
        else{
            toast.error(response.data.message);

        }
    }


  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmithandler}>
            <div className='add-image-upload flex-col'>
                <p>Upload image</p>
                <label htmlFor='image'>
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>{setImage(e.target.files[0])}} type='file' id='image' hidden required/>

            </div>
            <div className='add-product-name flex-col' >
                <p>Product name</p>
                <input onChange={onChangehandler}  value={data.name} type="text" name="name" placeholder='type here' />

            </div>
            <div className='add-product-description flex-col' >
                <p>Product description</p>
                <textarea onChange={onChangehandler}  value={data.description} name='description' rows="4" placeholder='Write content here' required></textarea>
            </div>

            <div className='add-category-price' >
                <div className='add-category flex-col' >
                    <p>Product category</p>
                    <select onChange={onChangehandler} name='category'>
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Desserts">Desserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure veg">Pure veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>

                    </select>

                </div>
                <div className='add-price flex-col' >
                    <p>Product price</p>
                    <input onChange={onChangehandler}  value={data.price}  type="Number" name="price" placeholder='100' />

                </div>

            </div>
            <button type='submit' className='add-btn'>ADD</button>


        </form>

    </div>
  )
}

export default Add