import React, { useContext, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { Storecontext } from '../../context/Storecontext';

const Navbar = ({setshowlogin}) => {
    const [menu,setmenu]=useState("menu");

    const {getTotalCartAmount,token,settoken}=useContext(Storecontext);

    const navigate=useNavigate();
    const onlogout=()=>{
        localStorage.removeItem("token");
        settoken("");
        navigate("/");
    }


  return (
    <div className='navbar'>
        <Link to='/'><p className='heading'>FOODIES</p></Link>
        <ul className='navbar-menu'>
            <Link to='/' className={menu==="Home"?"active":""} onClick={()=>{setmenu("Home")}}>Home</Link>
            <a href='#explore-menu' className={menu==="Menu"?"active":""} onClick={()=>{setmenu("Menu")}}>Menu</a>
            <a href='#app-download' className={menu==="Mobile-app"?"active":""} onClick={()=>{setmenu("Mobile-app")}}>Mobile-app</a>
            <a href='#footer' className={menu==="Contact-us"?"active":""} onClick={()=>{setmenu("Contact-us")}}>Contact us</a>
        </ul>
        <div className='navbar-right'>
            <p className='search-icon'><img src='https://img.icons8.com/color/512/search.png' alt='' /></p>
            <div className='navbar-search-icon'>
                <Link to='/cart'><div className='cart-icon'><img src='https://icons.veryicon.com/png/o/miscellaneous/flower-mall-color-icon/shopping-cart-114.png' /></div></Link>
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>
            {!token?<button onClick={()=>{setshowlogin(true)}}>Sign in</button>
            :<div className='navbar-profile'>
                <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="" />
                <ul className='nav-profile-dropdown'>
                    <li onClick={()=>navigate("/myorders")}><img src="https://cdn-icons-png.freepik.com/256/6054/6054069.png?semt=ais_hybrid" alt="" /><p>Orders</p></li>
                    <hr />
                    <li onClick={onlogout}><img src="https://cdn-icons-png.flaticon.com/512/4034/4034229.png" alt="" /><p>Logout</p></li>

                </ul>
            </div>

            }
            {/* <button onClick={()=>{setshowlogin(true)}}>Sign in</button> */}
        </div>
    </div>
  )
}

export default Navbar
