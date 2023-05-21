import React from "react";
import { auth, db } from "../../../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
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
import { Button, Container, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useParams } from "react-router-dom";

function DeleteFromMenu(props) {
  const params = useParams();
  const [menu, setMenu] = useState([]);
  const [newPrice, setNewPrice] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [discountId, setDiscountId] = useState("");
  const [gotSuperDiscount, setGotSuperDiscount] = useState(false);
  const [price, setprice] = useState();
  const [modalText, setModalText] = useState("INDIRIM ICIN YENI FIYAT GIRINIZ");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!props.params && user) {
        const colRef = collection(db, "Restaurants");
        const documentRef = doc(colRef, auth.currentUser.uid);
        const menuRef = collection(documentRef, "Menu");
        getDoc(documentRef).then((cred) => {
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
      } else if (props.params && user) {
        const colRef = collection(db, "Restaurants");
        const documentRef = doc(colRef, props.params);
        const menuRef = collection(documentRef, "Menu");
        getDoc(documentRef).then((cred) => {
          const menuArr = [];

          getDocs(menuRef)
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                if (doc.data().superDiscount) {
                  menuArr.push([doc.data(), doc.id]);
                  setGotSuperDiscount(true);
                } else {
                  menuArr.push([doc.data(), doc.id]);
                }
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

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 200,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "25px",
  };
  return (
    <Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography>{modalText}</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              sx={{ width: 250 }}
              value={newPrice}
              onChange={(e) => {
                setNewPrice(e.target.value);
              }}
              required
              id="outlined-basic"
              label="Yeni Fiyat"
              variant="outlined"
            />
            <Button
              sx={{ marginLeft: "20px", color: "white" }}
              onClick={() => {
                if (parseInt(newPrice) > parseInt(price))
                  return setModalText("YENI FIYAT ESKISINDAN BUYUK OLAMAZ");
                if (props.params) {
                  if (newPrice !== 0) {
                    const restaurantRef = doc(
                      collection(db, "Restaurants"),
                      props.params
                    );
                    const menuRef = doc(
                      collection(restaurantRef, "Menu"),
                      discountId
                    );
                    updateDoc(menuRef, {
                      superDiscount: true,
                      price: newPrice,
                    }).then(() => {
                      handleClose();
                      window.location.pathname = `/Restaurant/${props.params}`;
                    });
                  }
                } else if (!props.params) {
                  if (newPrice !== 0) {
                    const restaurantRef = doc(
                      collection(db, "Restaurants"),
                      auth.currentUser.uid
                    );
                    const menuRef = doc(
                      collection(restaurantRef, "Menu"),
                      discountId
                    );
                    updateDoc(menuRef, {
                      superDiscount: true,
                      price: newPrice,
                    }).then(() => {
                      handleClose();
                      window.location.pathname = `/Restaurant/${auth.currentUser.uid}`;
                    });
                  }
                }
              }}
              variant="contained"
            >
              KAYDET
            </Button>
          </Box>
        </Box>
      </Modal>
      <TableContainer sx={{ width: "100%" }} component={Paper}>
        <Table sx={{ overflowY: "scroll" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ISIM</TableCell>
              <TableCell align="left">ACIKLAMA</TableCell>
              <TableCell align="left">FIYAT</TableCell>
              <TableCell align="left">ESKI FIYAT</TableCell>
              <TableCell align="right">SIL</TableCell>
              <TableCell align="right">SUPER INDIRIM</TableCell>
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
                  <Typography sx={{ width: "20vw", overflow: "hidden" }}>
                    {row[0].description}
                  </Typography>
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                  {row[0].price} TL
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                  {row[0].oldPrice} TL
                </TableCell>
                <TableCell align="right" component="th" scope="row">
                  <Button
                    onClick={() => {
                      if (props.params) {
                        const restaurantRef = doc(
                          collection(db, "Restaurants"),
                          props.params
                        );
                        const menuRef = doc(
                          collection(restaurantRef, "Menu"),
                          row[1]
                        );
                        deleteDoc(menuRef)
                          .then(() => {
                            setMenu([
                              ...menu.slice(0, idx),
                              ...menu.slice(idx + 1),
                            ]);
                            console.log("DOC SUCCESSFULLY DELETED");
                          })
                          .catch((err) => {
                            console.log("COULDN'T DELETE", err);
                          });
                      } else if (!props.params) {
                        const restaurantRef = doc(
                          collection(db, "Restaurants"),
                          auth.currentUser.uid
                        );
                        const menuRef = doc(
                          collection(restaurantRef, "Menu"),
                          row[1]
                        );
                        deleteDoc(menuRef)
                          .then(() => {
                            alert("MENU SILINDI");
                          })
                          .catch((err) => {
                            console.log("COULDN'T DELETE", err);
                          });
                      }
                    }}
                    variant="contained"
                    sx={{ color: "white" }}
                  >
                    SIL
                  </Button>
                </TableCell>
                {!row[0].superDiscount && !gotSuperDiscount && (
                  <TableCell align="right" component="th" scope="row">
                    <Button
                      onClick={() => {
                        handleOpen();
                        setDiscountId(row[1]);
                        setprice(row[0].price);
                      }}
                      variant="contained"
                      sx={{ color: "white" }}
                    >
                      SUPER INDIRIM
                    </Button>
                  </TableCell>
                )}
                {!row[0].superDiscount && !gotSuperDiscount && ""}
                {!row[0].superDiscount ||
                  (gotSuperDiscount && (
                    <TableCell align="right" component="th" scope="row">
                      <Button
                        onClick={() => {
                          if (props.params) {
                            const restaurantRef = doc(
                              collection(db, "Restaurants"),
                              props.params
                            );
                            const menuRef = doc(
                              collection(restaurantRef, "Menu"),
                              row[1]
                            );
                            updateDoc(menuRef, {
                              superDiscount: false,
                              price: row[0].oldPrice,
                            }).then(() => {
                              window.location.pathname = `/Restaurant/${props.params}`;
                            });
                          } else if (!props.params) {
                            const restaurantRef = doc(
                              collection(db, "Restaurants"),
                              auth.currentUser.uid
                            );
                            const menuRef = doc(
                              collection(restaurantRef, "Menu"),
                              row[1]
                            );
                            updateDoc(menuRef, {
                              superDiscount: false,
                              price: row[0].oldPrice,
                            }).then(() => {
                              window.location.pathname = `/Restaurant/${auth.currentUser.uid}`;
                            });
                          }
                          setprice(row[0].price);
                        }}
                        variant="contained"
                        sx={{ color: "white" }}
                      >
                        SUPER INDIRIMI KALDIR
                      </Button>
                    </TableCell>
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default DeleteFromMenu;
