import React from "react";
import { auth, db } from "../../firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import AddToMenu from "./RestaurantPanelPages/AddToMenu";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import DeleteFromMenu from "./RestaurantPanelPages/DeleteFromMenu";
import { useParams } from "react-router-dom";
import Navbar from "../Layout/Navbar";

function RestaurantPanel() {
  const params = useParams();
  console.log(params.id);
  const sidebarItems = [
    {
      name: "MENUYE EKLEME YAP",
      pageNumber: 2,
      icon: <AddIcon sx={{ width: "30px", height: "30px" }} />,
    },
    {
      name: "MENUDEN SIL",
      pageNumber: 3,
      icon: <DeleteForeverIcon sx={{ width: "30px", height: "30px" }} />,
    },
    {
      name: "GELIR GIDER",
      pageNumber: 4,
      icon: <BookmarkAddIcon sx={{ width: "30px", height: "30px" }} />,
    },
    {
      name: "KULLANILAN KUPONLAR",
      pageNumber: 5,
      icon: <ConfirmationNumberIcon sx={{ width: "30px", height: "30px" }} />,
    },
  ];
  const [menu, setMenu] = useState();
  const [restaurantInfo, setRestaurantInfo] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const colRef = collection(db, "users");
        const documentRef = doc(colRef, auth.currentUser.uid);
        getDoc(documentRef)
          .then((cred) => {
            console.log(cred.data());
            if (
              cred.data().isAdmin ||
              cred.data().uid === params.id ||
              (cred.data().restaurantOwner && !params.id)
            ) {
              if (!params.id && user) {
                const colRef = collection(db, "Restaurants");
                const documentRef = doc(colRef, auth.currentUser.uid);
                const menuRef = collection(documentRef, "Menu");
                const docRef = doc(db, "Restaurants", user.uid);
                getDoc(documentRef)
                  .then((cred) => {
                    setRestaurantInfo(cred.data());
                    const menuArr = [];
                    getDocs(menuRef)
                      .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                          menuArr.push([doc.data(), doc.id]);
                        });
                        setMenu(menuArr);
                      })
                      .catch((error) => {
                        console.log("Error getting documents: ", error);
                      });
                  })
                  .catch(() => {
                    window.location.pathname = "/";
                  });
              } else if (params && user) {
                const colRef = collection(db, "Restaurants");
                const documentRef = doc(colRef, params.id);
                const menuRef = collection(documentRef, "Menu");
                const docRef = doc(db, "Restaurants", params.id);
                getDoc(documentRef)
                  .then((cred) => {
                    setRestaurantInfo(cred.data());
                    console.log(cred.data());
                    const menuArr = [];
                    getDocs(menuRef)
                      .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                          menuArr.push([doc.data(), doc.id]);
                        });
                        setMenu(menuArr);
                      })
                      .catch((error) => {
                        console.log("Error getting documents: ", error);
                      });
                  })
                  .catch(() => {
                    window.location.pathname = "/";
                  });
              }
            } else {
              window.location.pathname = "/";
            }
          })
          .catch(() => {
            window.location.pathname = "/";
          });
      } else {
        window.location.pathname = "/";
      }
    });
    return () => unsubscribe();
  }, [auth]);
  console.log(menu);
  return (
    <>
      {params && <Navbar />}
      <Container sx={{ marginTop: "64px", minHeight: "100vh" }}>
        <Box
          sx={{
            display: "flex",
            position: "fixed",

            flexDirection: "column",
            left: "0",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset",
            width: { xs: "30vw", sm: "20vw" },
            height: "100vh",
            paddingTop: "64px",
            backgroundColor: "#FA4A0C",
          }}
        >
          <Box sx={{ width: { xs: "30vw", sm: "20vw" }, height: "30%" }}>
            <Typography
              variant="h5"
              sx={{ width: "100%", textAlign: "center", color: "white" }}
            >
              {restaurantInfo.name}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "30px",
            }}
          >
            <Box
              onClick={() => {
                window.location.pathname = `/Restaurant/${restaurantInfo.createdBy}`;
              }}
              sx={{
                paddingLeft: "10px",
                width: { xs: "30vw", sm: "20vw" },
                height: "35px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                transition: "0.5s",
                color: "white",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "white",
                  color: "black",
                },
              }}
            >
              <Box
                sx={{
                  width: "35px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <HomeSharpIcon sx={{ width: "30px", height: "30px" }} />
              </Box>
              <Typography
                sx={{ fontSize: "20px", marginLeft: "5px", width: "80%" }}
              >
                RESTORAN SAYFASI
              </Typography>
            </Box>
            {sidebarItems.map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  paddingLeft: "10px",
                  width: { xs: "30vw", sm: "20vw" },
                  height: "35px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  transition: "0.5s",
                  color: "white",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "black",
                  },
                }}
                onClick={(e) => setPageNumber(item.pageNumber)}
              >
                <Box
                  sx={{
                    width: "35px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </Box>
                <Typography
                  sx={{ fontSize: "20px", marginLeft: "5px", width: "80%" }}
                >
                  {item.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            width: { xs: "70vw", sm: "80vw" },
            height: "100vh",
            paddingTop: "64px",
            position: "absolute",
            right: 0,
          }}
        >
          {pageNumber === 2 && <AddToMenu params={params.id} />}
          {pageNumber === 3 && <DeleteFromMenu params={params.id} />}
        </Box>
      </Container>
    </>
  );
}

export default RestaurantPanel;
