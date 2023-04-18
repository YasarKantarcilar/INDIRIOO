import Footer from "../Layout/Footer"
import Navbar from "../Layout/Navbar"
import Restaurants from "./Restaurants";
import Map from "./Map";
import { Routes, Route } from "react-router-dom";
function Main() {

  return (
    <div>
      <Navbar/>
      <Map/>
      <Restaurants/>
      <Footer/>
    </div>
  );
}

export default Main;