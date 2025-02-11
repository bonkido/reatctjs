import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='sidebar'>
    <div className="sidebar-options">
      <NavLink to='/add' className="sidebar-option">
        <img src={assets.add_icon} alt="" />
        <p>Thêm sản phẩm</p>
      </NavLink>
      <NavLink to='/list' className="sidebar-option">
        <img src={assets.order_icon} alt="" />
        <p>Sản phẩm</p>
      </NavLink>
      <NavLink to='/category' className="sidebar-option">
        <img src={assets.order_icon} alt="" />
        <p>Danh mục</p>
      </NavLink>
      <NavLink to='/order' className="sidebar-option">
        <img src={assets.order_icon} alt="" />
        <p>Đặt hàng</p>
      </NavLink>
    </div>
    </div>
  )
}

export default Sidebar