import React from "react";
import { auth, db } from "../../../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Container } from "@mui/material";

function DeleteFromMenu() {
  const [menu, setMenu] = useState([]);

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

  console.log(menu);
  return (
    <Container>
      <TableContainer sx={{ width: "100%" }} component={Paper}>
        <Table sx={{ overflowY: "scroll" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ISIM</TableCell>
              <TableCell align="left">ACIKLAMA</TableCell>
              <TableCell align="left">FIYAT</TableCell>
              <TableCell align="right">SIL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menu.map((row, idx) => (
              <TableRow
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left" component="th" scope="row">
                  {row[0].name}
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                  {row[0].description}
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                  {row[0].price} TL
                </TableCell>
                <TableCell align="right" component="th" scope="row">
                  <Button
                    onClick={() => {
                      const restaurantRef = doc(
                        collection(db, "Restaurants"),
                        auth.currentUser.uid
                      );
                      const menuRef = doc(
                        collection(restaurantRef, "Menu"),
                        row[1]
                      );
                      deleteDoc(menuRef)
                        .then(() => console.log("DOC SUCCESSFULLY DELETED"))
                        .catch((err) => {
                          console.log("COULDN'T DELETE", err);
                        });
                    }}
                    variant="contained"
                    sx={{ color: "white" }}
                  >
                    SIL
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default DeleteFromMenu;
