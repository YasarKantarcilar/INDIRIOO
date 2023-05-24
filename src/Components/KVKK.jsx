import React from "react";
import Navbar from "./Layout/Navbar";

function KVKK() {
  const arr = [1, 2, 3, 4, 5, 6];

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
          <img src={require(`../Assets/KVKK/${item}.jpg`)} />
        ))}
      </div>
    </>
  );
}

export default KVKK;
