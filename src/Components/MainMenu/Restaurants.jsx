import { query, where, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { db } from "../../firebase";
import { Container, Typography } from "@mui/material";
import Image from "mui-image";
import { collection } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Restaurants() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "Restaurants");
    const stateQuery = query(colRef, where("isAccepted", "==", true));

    const applications = [];
    getDocs(stateQuery)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          applications.push([doc.data(), doc.id]);
        });
        setData(applications);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);

  return (
    <Container>
      <Typography sx={{ my: 3, textAlign: "center" }} variant="h4">
        BANA EN YAKIN RESTORANLAR
      </Typography>
      <Box
        sx={{
          mb: 8,
          gap: "5px",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          display: "flex",
        }}
      >
        {data.map((item, idx) => (
          <Box
            key={idx}
            component="div"
            sx={{
              p: 0,
              minHeight: 200,
              maxHeight: 350,
              msOverflowStyle: "none",
              my: 1,
              width: { xs: "49%", sm: "32%", md: "24%" },
              border: "2px solid #E14D2A",
            }}
          >
            {<Image src={item[0].imgUrl} width={"100%"} height={"60%"} />}
            <Typography
              sx={{ display: "block", textAlign: "center" }}
              variant="h5"
            >
              {item[0].name}
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link color="orange" to={`Restaurant/${item[1]}`}>
                <Typography color={"orange"}>DETAYLAR</Typography>
              </Link>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
