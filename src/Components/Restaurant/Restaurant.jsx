import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Box, Typography, Button } from "@mui/material";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Image from "mui-image";
import Navbar from "../Layout/Navbar";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Map from "../MainMenu/Map";
import MarkerIcon from "../../Assets/MarkerIcon/MarkerIcon.png";

function Restaurant() {
  const [currentLocation, setCurrentLocation] = useState({
    lat: null,
    lng: null,
  });
  const params = useParams();
  const [data, setData] = useState({ imgUrl: "" });
  const [menuData, setMenuData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [superMenu, setSuperMenu] = useState();

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
    const documentRef = doc(db, "Restaurants", params.id);

    getDoc(documentRef)
      .then((doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setData(data);

          const subcollectionRef = collection(documentRef, "Menu");
          getDocs(subcollectionRef).then((querySnapshot) => {
            const menuDataArr = [];
            querySnapshot.docs.forEach((doc) => {
              if (doc.data().superDiscount) {
                setSuperMenu(doc.data());
              } else {
                menuDataArr.push(doc.data());
              }
            });

            setMenuData(menuDataArr);
          });
        } else {
          window.location.pathname = "/";
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);
  console.log(menuData);
  console.log(superMenu);
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
          <Box sx={{ width: { xs: "100%", s: "49%" }, height: "450px" }}>
            <LoadScript
              googleMapsApiKey={process.env.REACT_APP_API_KEY}
              onLoad={() => {
                setIsLoaded(true);
              }}
            >
              {data.lat && data.lng && (
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  center={{ lat: data.lat, lng: data.lng }}
                  zoom={18}
                  options={{
                    disableDefaultUI: true,
                    zoomControl: true,
                  }}
                >
                  {isLoaded && (
                    <Marker
                      icon={{
                        url: MarkerIcon,
                        scaledSize: new window.google.maps.Size(40, 40),
                      }}
                      position={{
                        lat: currentLocation.lat,
                        lng: currentLocation.lng,
                      }}
                    />
                  )}
                  <Marker position={{ lat: data.lat, lng: data.lng }} />
                </GoogleMap>
              )}
            </LoadScript>
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
          {superMenu && (
            <Box
              sx={{
                p: 0,
                minHeight: 200,
                maxHeight: 350,
                my: 1,
                border: "2px solid #FA4A0C",
                width: { xs: "32%", sm: "24", md: "19%" },
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
              }}
            >
              <Image src={superMenu.imgUrl} width={"100%"} height={"60%"} />
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
                INDIRIOO: {superMenu.name}
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
                    color: "#FA4A0C",
                    textAlign: "center",
                    wordWrap: "break-word",
                  }}
                  variant="p"
                >
                  SUPER INDIRIMLI MENU
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
                  sx={{
                    textAlign: "center",
                    width: "100%",
                    textDecoration: "line-through",
                  }}
                  variant="p"
                >
                  {superMenu.oldPrice}₺
                </Typography>
                <Typography
                  sx={{
                    textAlign: "center",
                    width: "100%",
                    color: "orange",
                    fontWeight: "700",
                  }}
                  variant="p"
                >
                  {superMenu.price}₺
                </Typography>
              </Box>
            </Box>
          )}
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
                INDIRIOO: {item.name}
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
                {parseInt(item.price) < parseInt(item.oldPrice) && (
                  <Typography
                    sx={{
                      textAlign: "center",
                      width: "100%",
                      textDecoration: "line-through",
                    }}
                    variant="p"
                  >
                    {item.oldPrice}₺
                  </Typography>
                )}
                <Typography
                  sx={{
                    textAlign: "center",
                    width: "100%",
                    color: "orange",
                    fontWeight: "700",
                  }}
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
