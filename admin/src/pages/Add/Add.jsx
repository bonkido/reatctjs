import React, { useState , useEffect } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios";
import { toast } from 'react-toastify';
// eslint-disable-next-line react/prop-types
const Add = ({url}) => {
  const [list,setList] = useState([]);
  const fetchList = async () => {
      const response = await axios.get(`${url}/api/food/categories`)
  
      if(response.data.success){
        setList(response.data.categories);
      }
      else{
        toast.error("Error")
      }
    }
    useEffect(()=>{
      fetchList()
    })
  const [image,setImage] = useState(false);
  const [data,setData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("price", Number(data.price))
    formData.append("category",data.category)
    formData.append("image",image)
    const response = await axios.post(`${url}/api/food/add`, formData)
    if(response.data.success){
      setData({
        name: '',
        description: '',
        category: '',
        price: '',
      })
      setImage(false)
      toast.error(response.data.message)
    }else {
      toast.success(response.data.message)
    }
  }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Tải ảnh lên</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
            <p>Tên sản phẩm</p>
            <input onChange={onChangeHandler} value={data.name}  type="text" name="name" placeholder='Nhập tên' />
        </div>
        <div className="add-product-description flex-col">
          <p>Tiêu đề sản phẩm</p>
          <textarea  onChange={onChangeHandler} value={data.description}  name="description" rows="6" placeholder='tiêu dề tại đây' id=""></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
              <p>Danh mục sản phẩm</p>
                  <select onChange={onChangeHandler} value={data.category} name="category" id="">
                    <option value="">Chọn danh mục</option>
                    {list.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
          </div>
          <div className="add-price flex-col">
            <p>Giá sản phẩm</p>
            <input  onChange={onChangeHandler} value={data.price}  type="number" name='price' placeholder='$20' />
          </div>
        </div>
        <button type='submit' className='add-btn'>Thêm sản phẩm</button>
      </form>
    </div>
  )
}

export default Add