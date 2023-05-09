import { useState } from "react";
import Footer from "../Layout/Footer";
import Navbar from "../Layout/Navbar";
import Restaurants from "./Restaurants";
import Map from "./Map";
import { QueryContext } from "../../Context/QueryContext";
import { Container } from "@mui/material";
function Main() {
  const [queryData, setQueryData] = useState("DONER");

  return (
    <div>
      <Navbar />
      <QueryContext.Provider value={{ queryData, setQueryData }}>
        <Container>
          <Map />
        </Container>
        <Restaurants />
      </QueryContext.Provider>
      <Footer />
    </div>
  );
}

export default Main;
