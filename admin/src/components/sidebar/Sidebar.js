import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className='sidebar-options'>
            <NavLink to='/add' className='sidebar-option'>
                <img  className ="icons" src={assets.add_icon} />
                <p>Add items</p>

            </NavLink>
            <NavLink to='/list' className='sidebar-option'>
                <img className ="icons" src={assets.order_icon} />
                <p>List items</p>

            </NavLink>
            <NavLink to='/orders' className='sidebar-option'>
                <img className ="icons" src={assets.order_icon} />
                <p>Orders</p>

            </NavLink>

        </div>

    </div>
  )
}

export default Sidebar