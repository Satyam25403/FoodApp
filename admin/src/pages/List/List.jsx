import './List.css'
import axios from "axios"
import { useEffect, useState } from 'react'
import {toast} from "react-toastify"

const List = ({url}) => {

  
  const [list,setList] =useState([])

  const fetchList =async () =>{

    // hit the end point and get the data
    const res=await axios.get(`${url}/api/food/list`)
    
    if(res.data.success){
      setList(res.data.data);
    }
    else{
      toast.error("Error")
    }
  }

  const removeFood = async (foodId) =>{
    const res= await axios.post(`${url}/api/food/remove`,{id:foodId})

    // update ui with the remaining items
    await fetchList()
    if(res.data.success){
      toast.success(res.data.message)
    }
    else{
      toast.error("An error occurred while removing food")
    }
  }

  // whenever webpage loaded run the above function
  useEffect(()=>{
    fetchList();
  },[])


  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/`+item.image}/>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <button onClick={()=>removeFood(item._id)} className="cursor">Remove</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List