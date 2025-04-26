import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext)

  return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>

        <div className="food-display-list">
            {food_list.map((item,index)=>{

                // if category stored matches current category, display those items else display all
                if(category==="All" || category===item.category){
                    return (
                        // for each fooditem in foodlist extract the details and pass as props for the foodItem display card
                        <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
                    )
                }
            })}
        </div>
    </div>
  )
}

export default FoodDisplay
