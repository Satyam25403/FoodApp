import './Add.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({url}) => {

  const [image,setImage] =useState("")
  const [data,setData] =useState({
    name:"",
    description: "",
    price: "",
    category: "Salad"     //default: set it to first option in dropdown
  })

  const onChangeHandler=(event)=>{
    // find event name and value
    const name= event.target.name;
    const value=event.target.value;

    // update the value of the field->[name]
    setData(data=>({...data,[name]:value}))
  }

  // useEffect(()=>{
  //   console.log(data)
  // },[data])   //whenever data is changed, run this




  // to make api call: write one onSubmitHandler: working 
  const onSubmitHandler = async(event)=>{

    // to prevent reload upon submission
    event.preventDefault()

    // append form data
    const formData=new FormData();
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("price",Number(data.price))
    formData.append("category",data.category)
    formData.append("image",image)

    // send formData to backend endpoint using api call using axios
    const response= await axios.post(`${url}/api/food/add`,formData)
    if(response.data.success){
      setData({
        name:"",
        description: "",
        price: "",
        category: "Salad"    
      })
      setImage("")


      // send notification onto panel
      toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)
    }
  }


  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>

        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor='image'>
            {/* if image uploaded..render its preview else keep upload area */}
            <img src={image ? URL.createObjectURL(image) :assets.upload_area}/>
          </label>
          <input onChange={(e)=> setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>

        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here...' />
        </div>

        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="Writer here..." required />
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} value={data.category} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desserts">Desserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodels">Noodles</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product price</p>
            <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder='$10' />
          </div>
        </div>

        <button type='submit' className='add-btn'>Add</button>
      </form>
    </div>
  )
}

export default Add