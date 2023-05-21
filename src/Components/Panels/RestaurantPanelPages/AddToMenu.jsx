import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Box, TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { collection, doc, setDoc } from "firebase/firestore";
import { storage } from "../../../firebase";

function AddToMenu(props) {
  const [imgUpload, setImgUpload] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [text, setText] = useState("");
  const [fetchInfo, setFetchInfo] = useState("");

  function handleSubmit() {
    if (props.params) {
      const colRef = collection(db, "Restaurants");
      const documentRef = doc(colRef, props.params);
      const menuRef = collection(documentRef, "Menu");
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
          oldPrice: oldPrice,

          superDiscount: false,
          date: new Date(),
        })
          .then(() => {
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
        setText(
          "LUTFEN BILGILERI EKSIKSIZ GIRINIZ VEYA FOTOGRAFI DEGISTIRINIZ"
        );
      }
    } else if (!props.params) {
      const colRef = collection(db, "Restaurants");
      const documentRef = doc(colRef, auth.currentUser.uid);
      const menuRef = collection(documentRef, "Menu");
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
          oldPrice: oldPrice,
          superDiscount: false,
          date: new Date(),
        })
          .then(() => {
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
        setText(
          "LUTFEN BILGILERI EKSIKSIZ GIRINIZ VEYA FOTOGRAFI DEGISTIRINIZ"
        );
      }
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
    if (!props.params) {
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
    } else if (props.params) {
      if (imgUpload == null) return;
      const imageRef = ref(
        storage,
        `Restaurant/${props.params}/${imgUpload.name + new Date()}`
      );
      uploadBytes(imageRef, imgUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImgUrl(url);
        });
      });
    }
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
      <Typography>MENUYE EKLEME YAP</Typography>
      <TextField
        value={name}
        sx={{ width: "300px", height: "35px", marginTop: "15px" }}
        onChange={(e) => setname(e.target.value)}
        id="outlined-basic"
        label="Yemek Ismi"
        variant="outlined"
      />
      <TextField
        value={description}
        sx={{ width: "300px", height: "35px", marginTop: "15px" }}
        onChange={(e) => setdescription(e.target.value)}
        id="outlined-basic"
        label="Aciklamasi"
        variant="outlined"
      />
      <TextField
        value={oldPrice}
        sx={{ width: "300px", height: "35px", marginTop: "15px" }}
        onChange={(e) => setOldPrice(e.target.value)}
        id="outlined-basic"
        label="Eski Fiyat"
        variant="outlined"
      />
      <TextField
        value={price}
        sx={{ width: "300px", height: "35px", marginTop: "15px" }}
        onChange={(e) => setprice(e.target.value)}
        id="outlined-basic"
        label="Fiyat"
        variant="outlined"
      />
      <Typography sx={{ marginTop: "15px" }}>YEMEK FOTOGRAFI</Typography>
      <TextField
        sx={{ width: "300px", height: "35px" }}
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
          width: "150px",
          height: "50px",
          marginTop: "25px",
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
            width: "150px",
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
