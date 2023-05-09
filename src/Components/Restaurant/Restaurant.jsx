import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Box, Typography, Button } from "@mui/material";
import Image from "mui-image";
import Navbar from "../Layout/Navbar";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

function Restaurant() {
  const params = useParams();
  const [data, setData] = useState([]);
  const [menuData, setMenuData] = useState([]);
  useEffect(() => {
    const documentRef = doc(db, "Restaurants", params.id);

    getDoc(documentRef)
      .then((doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setData(data);

          const subcollectionRef = collection(documentRef, "Menu");
          getDocs(subcollectionRef).then((querySnapshot) => {
            const subcollectionData = querySnapshot.docs.map((doc) =>
              doc.data()
            );

            setMenuData(subcollectionData);
          });
        } else {
          window.location.pathname = "/";
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);
  console.log(data);
  return (
    <>
      <Navbar />
      <Container
        sx={{ display: "flex", flexDirection: "column", marginTop: "30px" }}
      >
        <Box
          sx={{
            marginTop: "64px",
            display: "flex",
            gap: "20px",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ width: { xs: "100%", s: "49%" } }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1503.2045807071834!2d29.025776008001202!3d41.10375432332514!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab5e8e292693d%3A0xf77b90dec6392e12!2sIstanbul%20Technical%20University%20-%20Mineral%20Processing%20Eng.%20Dept.%20-%20Surface%20Chemistry%20Research%20Group!5e0!3m2!1str!2str!4v1680777808117!5m2!1str!2str"
              width="100%"
              height="450"
            ></iframe>
          </Box>
          <Box
            sx={{
              width: { xs: "100%", s: "49%" },
              height: "450px",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "15px",
                marginTop: "15px",
                gap: "30px",
              }}
            >
              <Box
                sx={{
                  marginLeft: "25px",
                  width: "100px",
                  height: "100px",
                }}
              >
                <Image
                  src={data.imgUrl}
                  style={{
                    width: "200px",
                    height: "100px",
                    border: "1px solid black",
                    borderRadius: "15px",
                  }}
                />
              </Box>
              <Box
                sx={{
                  height: "100px",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                }}
              >
                <Typography
                  sx={{ marginTop: "15px", textAlign: "center" }}
                  variant="h4"
                >
                  {data.name}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "30px",
                marginLeft: "15px",
                marginTop: "15px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "400",
                }}
              >
                Restoran Türü: {data.field}
              </Typography>

              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "400",
                }}
              >
                AÇILIŞ: {data.openingTime}:00
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "400",
                }}
              >
                KAPANIS: {data.closingTime}:00
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "400",
                }}
              >
                İLETİŞİM: {data.restaurantTel}
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "400",
                }}
              >
                ADRES: {data.address}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            flexWrap: "wrap",
            justifyContent: "flex-start",
            display: "flex",
            gap: "5px",
          }}
        >
          {menuData.map((item, idx) => (
            <Box
              key={idx}
              sx={{
                p: 0,
                minHeight: 200,
                maxHeight: 350,
                my: 1,
                width: { xs: "32%", sm: "24", md: "19%" },
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
              }}
            >
              <Image src={item.imgUrl} width={"100%"} height={"60%"} />
              <Typography
                sx={{
                  color: "orange",
                  height: "10%",
                  overflow: "hidden",
                  display: "block",
                  textAlign: "center",
                }}
                variant="P"
              >
                {item.name}
              </Typography>

              <Box
                sx={{
                  mx: "5%",
                  width: "90%",
                  overflow: "hidden",
                  height: "20%",
                }}
              >
                <Typography
                  sx={{
                    overflow: "hidden",

                    textAlign: "center",
                    wordWrap: "break-word",
                  }}
                  variant="p"
                >
                  {item.description}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "10%",
                }}
              >
                <Typography
                  sx={{ textAlign: "center", width: "100%" }}
                  variant="p"
                >
                  {item.price}₺
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
}

export default Restaurant;
