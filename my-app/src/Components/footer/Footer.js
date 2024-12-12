import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className='footer-content-left'> 
          <h1>FOODIES</h1>
          {/* <img src='https://t4.ftcdn.net/jpg/04/99/71/93/360_F_499719384_vuQJvGwILU6Rzlg56m5bZxFehLSWA23K.jpg' alt='' /> */}
          <p>Your one-stop solution for all your food cravings! Browse, add to cart, and order from your
             favorite restaurants with ease.Managed by an intuitive
              admin dashboard, Foofies ensures your orders are updated and handled efficiently.
               Satisfy your hunger, fast and fresh!</p>
          <div className='footer-social-icons'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png' alt='' />
            <img src='https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png' alt='' />
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/1245px-Logo_of_Twitter.svg.png' alt='' />
          </div>

        </div>
        <div className='footer-content-center'> 
          <h3>COMPANY</h3>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>

        </div>
        <div className='footer-content-right'> 
          <h3>
            GET IN TOUCH
          </h3>
          <ul>
            <li>+1-123-456-7890</li>
            <li>contact@foodies.com</li>
          </ul>

        </div>

      </div>
      <hr />
      <p className='footer-copyright'>Copyright 2024 @ Foodies.com - All Right Reserved</p>
    </div>
  )
}

export default Footer