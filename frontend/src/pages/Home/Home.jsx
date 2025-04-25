import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'


const Home = () => {

  // to store what category of foods to display.....default is all
  const [category,setCategory] = useState("All")

  return (
    <div>
      <Header/>

      {/* we need to destructure these where we are passing these as props to */}
      <ExploreMenu category={category} setCategory={setCategory}/>
    </div>
  )
}

export default Home