import React from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import AdminPanel from "./AdminPanel";
import RestaurantPanel from "./RestaurantPanel";
import Navbar from "../Layout/Navbar";
import Restaurants from "../MainMenu/Restaurants";

function PanelNavigator() {
  const [userData, setUserData] = useState([]);
  console.log(userData);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef).then((doc) => {
          setUserData(doc.data());
        });
      } else {
        console.log("NOT LOGGED");
        window.location.pathname = "/";
      }
    });
    return () => unsubscribe();
  }, [auth]);
  if (userData.isAdmin === false && userData.restaurantOwner === false) {
    window.location.pathname = "/";
  }
  return (
    <>
      <Navbar />
      {userData.isAdmin !== true && userData.restaurantOwner !== true && (
        <Restaurants />
      )}
      {userData.isAdmin && <AdminPanel />}
      {userData.restaurantOwner && <RestaurantPanel />}
    </>
  );
}

export default PanelNavigator;
