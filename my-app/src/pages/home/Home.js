import React, { useState } from 'react'
import './Home.css'
import Header from '../../Components/Header/Header'
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu'
import Fooddisplay from '../../Components/Fooddisplay/Fooddisplay'
import Footer from '../../Components/footer/Footer'
import Appdownload from '../../Components/Appdownload/Appdownload'

const Home = () => {
  let [category,setcategory]=useState("all");


  return (
    <>
    <div>
        <Header />
        <ExploreMenu category={category} setcategory={setcategory} />
        <Fooddisplay  category={category}/>
        <Appdownload />
    </div>
    </>
  )
}

export default Home