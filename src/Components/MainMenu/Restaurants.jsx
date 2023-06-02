import { query, where, getDocs } from "firebase/firestore";
import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import { db } from "../../firebase";
import { Container, Typography } from "@mui/material";
import Image from "mui-image";
import { collection, onSnapshot } from "firebase/firestore";
import FieldsData from "../FieldsData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { QueryContext } from "../../Context/QueryContext";
import { getDistance } from "geolib";
import { Link } from "react-router-dom";
import Footer from "../Layout/Footer";

export default function Restaurants() {
  const queryContext = useContext(QueryContext);
  const queryData = queryContext && queryContext.queryData;
  const setQueryData = queryContext && queryContext.setQueryData;
  const [header, setHeader] = useState("YAKIN RESTORANLAR");
  const [swiperCount, setSwiperCount] = useState(7.5);
  const [currentLocation, setCurrentLocation] = useState({
    lat: null,
    lng: null,
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setSwiperCount(3.5);
      } else {
        setSwiperCount(7.5);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (currentLocation.lat && currentLocation.lng) {
      const colRef = collection(db, "Restaurants");
      const stateQuery = query(
        colRef,
        where("isAccepted", "==", true),
        where("field", "==", queryData)
      );

      getDocs(stateQuery)
        .then((querySnapshot) => {
          const near = [];
          const far = [];
          querySnapshot.forEach((doc) => {
            if (doc.data().lat && doc.data().lng) {
              const distance = getDistance(
                {
                  latitude: currentLocation.lat,
                  longitude: currentLocation.lng,
                },
                { latitude: doc.data().lat, longitude: doc.data().lng }
              );
              if (distance <= 3000) {
                near.push({ ...doc.data(), id: doc.id });
              } else {
                far.push({ ...doc.data(), id: doc.id });
              }
            }
          });
          if (near[0] != undefined) {
            setHeader("SIZE YAKIN RESTORANLAR");
            setData(near);
          } else if (near[0] == undefined && far[0] != undefined) {
            setHeader("SIZE UZAK RESTORANLAR");
            setData(far);
          } else if (near[0] == undefined && far[0] == undefined) {
            setHeader("BU ALANDA HIZMET VEREN RESTORAN BULUNMAMAKTADIR");
            setData([]);
          }
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  }, [currentLocation, queryData]);
  return (
    <>
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
            slidesPerView={swiperCount}
            spaceBetween={5}
            /* pagination={{
            clickable: true,
          }} */
            breakpoints={{
              320: { slidesPerView: 2.5, spaceBetween: 5 },
              480: { slidesPerView: 3.5, spaceBetween: 5 },
              768: { slidesPerView: 5.5, spaceBetween: 5 },
              1024: { slidesPerView: 7.5, spaceBetween: 5 },
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
                  setQueryData(item[0]);
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
        <Typography sx={{ textAlign: "center" }} variant="h4">
          {header}
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
              component="div"
              sx={{
                borderRadius: "5px",
                boxShadow: "rgba(17, 17, 26, 0.1) 0px 1px 0px",
                cursor: "pointer",
                p: 0,
                height: "200px",
                height: "250px",
                msOverflowStyle: "none",
                my: 1,
                width: { xs: "49%", sm: "24%", md: "19%" },
              }}
            >
              <Link key={idx} to={`Restaurant/${item.id}`}>
                {
                  <Image
                    style={{
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                    }}
                    src={item.imgUrl}
                    width={"100%"}
                    height={"70%"}
                  />
                }
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ fontWeight: "600" }} variant="p">
                    {item.name}
                  </Typography>
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "300",
                        color: "green",
                      }}
                      variant="p"
                    >
                      {item.field}
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
              </Link>
            </Box>
          ))}
        </Box>
      </Container>
      <Footer />
    </>
  );
}
