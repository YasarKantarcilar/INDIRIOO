import React, { useEffect } from "react";

import Navbar from "./Layout/Navbar";
import { useNavigate } from "react-router-dom";

function KVKK() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/Privacy");
  }, []);

  return <></>;
}

export default KVKK;
