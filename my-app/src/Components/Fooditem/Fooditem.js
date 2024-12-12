import React, { useContext, useState } from 'react'
import './Fooditem.css'
import { Storecontext } from '../../context/Storecontext';

const Fooditem = ({id,name,description,price,image}) => {
  const [itemcount,setitemcount]=useState(0);
  let {cartItems,addToCart,removeFromCart,url}=useContext(Storecontext);
  console.log(image);

  return (
    <div className='food-item'>
        <div className='food-item-img-container'>
            <img className="food-item-image" src={url+"/images/"+image} />
            {
              /*itemcount==0
              ?<img className='add' onClick={()=>{setitemcount(prev=>prev+1)}} src="https://cdn-icons-png.flaticon.com/512/61/61183.png" />
              :<div className='food-item-counter'>
                <img onClick={()=>{setitemcount(prev=>prev-1)}} src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-minus-icon-png-image_4275792.jpg"/>
                <p>{itemcount}</p>
                <img onClick={()=>{setitemcount(prev=>prev+1)}} src="https://png.pngtree.com/png-vector/20230410/ourmid/pngtree-add-button-vector-png-image_6697932.png" />
              </div>
              */
              (cartItems?.[id] === undefined || cartItems[id]===0)?
              (<img className='add' onClick={()=>{addToCart(id)}} src="https://cdn-icons-png.flaticon.com/512/61/61183.png" />)
              :(<div className='food-item-counter'>
                <img onClick={()=>removeFromCart(id)} src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-minus-icon-png-image_4275792.jpg"/>
                <p>{cartItems[id]}</p>
                <img onClick={()=>addToCart(id)} src="https://png.pngtree.com/png-vector/20230410/ourmid/pngtree-add-button-vector-png-image_6697932.png" />
                
              </div>
              )
            }
        </div>
        <div className='food-item-info'>
            <div className='food-item-rating'>
                <p>{name}</p>
                <img  src="https://cdn.vectorstock.com/i/500p/75/52/five-star-rating-glossy-yellow-gold-5-stars-vector-48127552.jpg" alt="" />
            </div>
            <p className='food-item-des'>{description}</p>
            <p className='food-item-price'>INR {price}</p>
        </div>

    </div>
  )
}

export default Fooditem;