import React from 'react'
import './Orders.css'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify';
import { useEffect } from 'react';
import {assets} from '../../assets/assets'

// eslint-disable-next-line react/prop-types
const Orders = ({url}) => {
  const [orders,setOrders] = useState([]);
  const fetchAllOrders = async () => {
    const response = await axios.get(url+"/api/order/list")
    if(response.data.success){
      setOrders(response.data.data)
    }
    else{
      toast.error("error")   
    }
  }

  const statusHandler = async(event,orderId) => {
    const response = await axios.post(url+"/api/order/status",{orderId,status:event.target.value})
    if(response.data.success){
      toast.success("Cập nhật trạng thái thành công")
      fetchAllOrders();
    }
    else{
      toast.error("error")
    }
  }

  useEffect(()=>{
    fetchAllOrders();
  },[])
  return (
    <div className='order add'>
    <h3>Đơn hàng </h3>
    <div className="order-list">
      {orders.map((order,index)=>(
        <div key={index} className="order-item">
          <img src={assets.parcel_icon} alt="" />
        <div>
          <p className='order-item-food'>
            {order.items.map((item,index)=>{
              if(index===order.items.length-1){
                return item.name+" x "+item.quantity
              }
              else {
                return item.name+" x "+item.quantity+", "
              }
            })}
            <p className='order-item-name'>{order.address.firstName+" "+order.address.lastName+" "}</p>
            <div className="order-item-address">
              <p>{order.address.street+","}</p>
              <p>{order.address.city+","+","+order.address.zipCode}</p>
            </div>
            <p className='order-item-phone'>
              {order.address.phone}
            </p>
          </p>
        </div>
        <p>Sản phẩm : {order.items.length}</p>
        <p>${order.amount}</p>
        <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
          <option value="Đã xác nhận">Đã xác nhận</option>
          <option value="Chờ xác nhận">Chờ xác nhận</option>
          <option value="Không xác nhận">Không xác nhận</option>
        </select>
        </div>

      ))}
    </div>
    </div>
  )
}

export default Orders