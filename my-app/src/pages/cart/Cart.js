import React, { useContext } from 'react'
import './Cart.css'
import { Storecontext } from '../../context/Storecontext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {cartItems,food_list,removeFromCart,getTotalCartAmount,url}=useContext(Storecontext);
  const navigate=useNavigate();

  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {
          food_list.map((item,index)=>{
            if(cartItems?.[item._id]>0){
              return (
                <>
                <div className='cart-items-title cart-items-item'>
                  <img src={url+"/images/"+item.image} />
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{item.price*cartItems[item._id]}</p>
                  <p onClick={()=>{removeFromCart(item._id)}}>X</p>
                </div>
                <hr/>
                </>
              )
            }

          })
        }


      </div>
      <div className='cart-bottom'>
        <div className='cart-total'>
          <h3>Cart Totals</h3>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              { <p>{getTotalCartAmount()}</p> }
            </div>
            <hr />
            <div className='cart-total-details'>
            <p>Delivery fees</p>
            <p>{2}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <b>Total</b>
              { <b>INR {getTotalCartAmount()+2}</b> }
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>Proceed to Checkout</button>
        </div>

        <div className='cart-promocode'>
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type='text' placeholder='promocode'/>
              <button>Submit</button>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Cart