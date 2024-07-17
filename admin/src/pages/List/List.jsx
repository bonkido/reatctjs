import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import {toast} from 'react-toastify'
// eslint-disable-next-line react/prop-types
const List = ({url}) => {

  const [list,setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)

    if(response.data.success){
      setList(response.data.data);
    }
    else{
      toast.error("Error")
    }
  }

  const removeFood = async(foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, {id: foodId})
    if(response.data.success){
      toast.success("Xóa thành công")
      fetchList()
    }
    else{
      toast.error("Error")
    }
  }

  useEffect(()=>{
    fetchList()
  })

  return (
    <div className='list add flex-col'>
      <p>Tất cả sản phẩm</p>
      <div className="list-table">
        <div className="list-table-format">
          <b>Ảnh</b>
          <b>Tên</b>
          <b>Danh mục</b>
          <b>Giá</b>
          <b>Hành động</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className="list-table-format">
            <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='cursor'>x</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List