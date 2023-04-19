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
            onClick={() => {
              window.location.pathname = `Restaurant/${item[1]}`;
            }}
            key={idx}
            component="div"
            sx={{
              borderRadius: "5px",
              boxShadow: "rgba(17, 17, 26, 0.1) 0px 1px 0px",
              cursor: "pointer",
              p: 0,
              minHeight: 200,
              maxHeight: 350,
              msOverflowStyle: "none",
              my: 1,
              width: { xs: "32%", sm: "24%", md: "19%" },
            }}
          >
            {
              <Image
                style={{
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
                src={item[0].imgUrl}
                width={"100%"}
                height={"70%"}
              />
            }
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ fontWeight: "600" }} variant="p">
                {item[0].name}
              </Typography>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <Typography
                  sx={{ fontSize: "14px", fontWeight: "300", color: "green" }}
                  variant="p"
                >
                  {item[0].field}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            ></Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
