import React from "react";
import k1 from "../Assets/gizlilik/1.jpg";
import k2 from "../Assets/gizlilik/2.jpg";
import k3 from "../Assets/gizlilik/3.jpg";
import k4 from "../Assets/gizlilik/4.jpg";
import k5 from "../Assets/gizlilik/5.jpg";
import k6 from "../Assets/gizlilik/6.jpg";
import k7 from "../Assets/gizlilik/7.jpg";
import k8 from "../Assets/gizlilik/8.jpg";
import k9 from "../Assets/gizlilik/9.jpg";
import k10 from "../Assets/gizlilik/10.jpg";
import k11 from "../Assets/gizlilik/11.jpg";
import Navbar from "./Layout/Navbar";

function Privacy() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return (
    <>
      <Navbar />
      <div
        style={{
          width: "100%",
          minHeight: "100vw",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "70px",
        }}
      >
        {arr.map((item, idx) => (
          <img src={require(`../Assets/gizlilik/${item}.jpg`)} />
        ))}
      </div>
    </>
  );
}

export default Privacy;
