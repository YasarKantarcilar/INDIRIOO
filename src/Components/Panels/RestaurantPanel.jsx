import React from "react";
import { auth, db } from "../../firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import AddToMenu from "./RestaurantPanelPages/AddToMenu";

function RestaurantPanel() {
  const [menu, setMenu] = useState();
  const [page, setPage] = useState(1);

  const colRef = collection(db, "Restaurants");
  const documentRef = doc(colRef, auth.currentUser.uid);
  const menuRef = collection(documentRef, "Menu");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, "Restaurants", user.uid);
        getDoc(docRef).then((cred) => {
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
        });
      } else {
        console.log("NOT LOGGED");
      }
    });
    return () => unsubscribe();
  }, [auth]);
  return (
    <Container sx={{ marginTop: "75px", minHeight: "100vh" }}>
      <Box
        sx={{
          width: "100%",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "50px",
        }}
      >
        <Button
          onClick={() => setPage(1)}
          variant="contained"
          sx={{ color: "white" }}
        >
          MENUYE EKLEME YAP
        </Button>
        <Button
          onClick={() => {
            window.location.pathname = `/Restaurant/${auth.currentUser.uid}`;
          }}
          variant="contained"
          sx={{ color: "white" }}
        >
          RESTORAN SAYFASINI GORUNTULE
        </Button>
        <Button variant="contained" sx={{ color: "white" }}>
          MENUYU DUZENLE
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "500px",
        }}
      >
        {page == 1 && <AddToMenu />}
      </Box>
    </Container>
  );
}

export default RestaurantPanel;
