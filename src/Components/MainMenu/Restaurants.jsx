import { query, where, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { db } from "../../firebase";
import { Container, Typography } from "@mui/material";
import Image from "mui-image";
import { collection, onSnapshot } from "firebase/firestore";
import FieldsData from "../FieldsData";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import { Pagination } from "swiper";
export default function Restaurants() {
  const [data, setData] = useState([]);
  const [queryField, setQueryfield] = useState("DONER");

  const colRef = collection(db, "Restaurants");
  const stateQuery = query(
    colRef,
    where("isAccepted", "==", true),
    where("field", "==", queryField)
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(
      stateQuery,
      (querySnapshot) => {
        const docs = querySnapshot.docs.map((doc) => [doc.data(), doc.id]);
        setData(docs);
        console.log(docs);
      },
      (error) => {
        console.log("Error getting documents: ", error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [queryField]);
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          gap: "10px",
        }}
      >
        <Swiper
          style={{ marginTop: "30px" }}
          slidesPerView={7.5}
          spaceBetween={5}
          /* pagination={{
            clickable: true,
          }} */
          breakpoints={{
            "@0.00": {
              slidesPerView: 7.5,
              spaceBetween: 10,
            },
            "@0.75": {
              slidesPerView: 7.5,
              spaceBetween: 10,
            },
            "@1.00": {
              slidesPerView: 7.5,
              spaceBetween: 10,
            },
            "@1.50": {
              slidesPerView: 7.5,
              spaceBetween: 10,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {FieldsData.map((item, idx) => (
            <SwiperSlide
              key={idx}
              style={{
                height: "180px",
                width: "100px",
                cursor: "pointer",
              }}
              onClick={() => {
                setQueryfield(item[0]);
              }}
            >
              <Box sx={{ height: "50%", borderRadius: "50%" }}>
                <Image src={item[2]} />
              </Box>
              <Typography
                sx={{
                  textAlign: "center",
                  marginTop: "15px",
                }}
              >
                {item[0]}
              </Typography>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
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
