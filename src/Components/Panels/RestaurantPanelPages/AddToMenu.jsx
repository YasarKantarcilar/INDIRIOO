import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Box, TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { collection, doc, setDoc } from "firebase/firestore";
import { storage } from "../../../firebase";

function AddToMenu() {
  const [imgUpload, setImgUpload] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [text, setText] = useState("");
  const colRef = collection(db, "Restaurants");
  const documentRef = doc(colRef, auth.currentUser.uid);
  const menuRef = collection(documentRef, "Menu");

  function handleSubmit() {
    if (
      name !== "" &&
      description !== "" &&
      price !== "" &&
      imgUrl !== null &&
      imgUpload !== null
    ) {
      setDoc(doc(menuRef), {
        name: name,
        description: description,
        price: price,
        imgUrl: imgUrl,
        date: new Date(),
      })
        .then(() => {
          console.log("DOC WRITTEN");
          setname("");
          setImgUrl(null);
          setprice("");
          setdescription("");
          setImgUpload(null);
          setImgUrl(null);
          setText("YEMEK BASARIYLA MENUYE EKLENMISTIR");
          setTimeout(() => {
            setText("");
          }, 2000);
        })
        .catch((err) => console.log("ERROR", err));
    } else {
      setText("LUTFEN BILGILERI EKSIKSIZ GIRINIZ VEYA FOTOGRAFI DEGISTIRINIZ");
    }
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("LOGGED IN");
      } else {
        console.log("NOT LOGGED");
      }
    });

    return () => unsubscribe();
  }, [auth]);
  function handleUploadImg(e) {
    if (imgUpload == null) return;
    const imageRef = ref(
      storage,
      `Restaurant/${auth.currentUser.uid}/${imgUpload.name + new Date()}`
    );
    uploadBytes(imageRef, imgUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImgUrl(url);
      });
    });
  }
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TextField
        value={name}
        onChange={(e) => setname(e.target.value)}
        id="outlined-basic"
        label="Yemek Ismi"
        variant="outlined"
      />
      <TextField
        value={description}
        onChange={(e) => setdescription(e.target.value)}
        id="outlined-basic"
        label="Aciklamasi"
        variant="outlined"
      />
      <TextField
        value={price}
        onChange={(e) => setprice(e.target.value)}
        id="outlined-basic"
        label="Fiyat"
        variant="outlined"
      />
      <Typography>YEMEK FOTOGRAFI</Typography>
      <TextField
        sx={{ width: "425px", height: "35px" }}
        id="outlined-basic"
        variant="outlined"
        type="file"
        onChange={(e) => {
          setImgUpload(e.target.files[0]);
        }}
      />
      <Button
        sx={{
          color: "white",
          width: "105px",
          height: "50px",
        }}
        onClick={(e) => {
          handleUploadImg(e);
        }}
        variant="contained"
      >
        YUKLE
      </Button>
      {imgUrl !== null ? (
        <Button
          sx={{
            color: "white",
            width: "105px",
            height: "50px",
          }}
          onClick={() => handleSubmit()}
          variant="contained"
        >
          EKLE
        </Button>
      ) : (
        <Button
          sx={{
            color: "white",
            width: "205px",
            height: "50px",
          }}
          variant="contained"
          disabled
        >
          LUTFEN ONCE RESIM YUKLEYINIZ
        </Button>
      )}
      <Typography>{text}</Typography>
    </Box>
  );
}

export default AddToMenu;
