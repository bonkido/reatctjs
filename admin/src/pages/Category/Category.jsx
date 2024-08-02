import React, { useCallback, useEffect, useState } from 'react'
import './Category.css'
import axios from 'axios';
import {toast} from 'react-toastify'

// eslint-disable-next-line react/prop-types
const Category = ({url}) => {

    const [list,setList] = useState([]);

    const fetchList = useCallback(async () => {
      const response = await axios.get(`${url}/api/food/categories`);
      if (response.data.success) {
        setList(response.data.categories);
      } else {
        toast.error("Error");
      }
    }, [url]);
    
      const addCategory = async () => {
        const response = await axios.post(`${url}/api/food/addcategories`, {name: document.querySelector('.addCateInput').value})
        if(response.data.success){
          fetchList()
        }
        document.querySelector('.addCateInput').value = ''
      }

      const handleDeleteCategory = useCallback(
        async (categoryName) => {
          try {
            await axios.post(`${url}/api/food/removecategories`, { category: categoryName });
            const updatedCategories = list.filter((cat) => cat !== categoryName);
            setList(updatedCategories);
          } catch (error) {
            console.error("Error deleting category:", error);
          }
        },
        [list]
      );
    
      useEffect(()=>{
        fetchList()
      })
    

  return (
    <div className="container">
       <button className='addCategory' onClick={addCategory} >Thêm danh mục</button>
       <input type="text" className='addCateInput' placeholder='Điền danh mục cần thêm'/>
      <div className="list-tablee">
        <div className="list-table-formatm">
          <b>Danh mục</b>
          <b>Hành động</b>
        </div>
        {list.map((item) => (
          <div key={item} className="list-table-formatm">
            <p>{item}</p>
            <p onClick={() => handleDeleteCategory(item)} className="cursor">
              x
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Category