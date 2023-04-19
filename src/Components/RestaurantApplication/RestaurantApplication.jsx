import React, { useState } from "react";
import Navbar from "../Layout/Navbar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Container, Typography } from "@mui/material";
import { auth, db, storage } from "../../firebase";
import { setDoc, doc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function RestaurantApplication() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [taxUnit, setTaxUnit] = useState("");
  const [taxNo, setTaxNo] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerTel, setOwnerTel] = useState("");
  const [tel, setTel] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [address, setAddress] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [text, settext] = useState("");
  const [isSubmitting, setisSubmitting] = useState(true);
  const [imgUrl, setimgUrl] = useState(null);
  const [imgUpload, setImgUpload] = useState(null);
  const [buttonText, setbuttonText] = useState("FOTOGRAF YUKLEYINIZ");
  const [field, setField] = useState("");
  const colRef = collection(db, "Restaurants");

  function handleUploadImg(e) {
    if (imgUpload == null) return;
    const imageRef = ref(
      storage,
      `RestaurantImages/${imgUpload.name + new Date()}`
    );
    uploadBytes(imageRef, imgUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setimgUrl(url);
        setisSubmitting(false);
      });
    });
  }
  function handleSubmit(e) {
    setbuttonText("BEKLEYINIZ");
    setisSubmitting(true);

    if (
      name !== "" &&
      location !== "" &&
      taxUnit !== "" &&
      taxNo !== "" &&
      ownerName !== "" &&
      ownerTel !== "" &&
      tel !== "" &&
      closingTime !== "" &&
      openingTime !== "" &&
      address !== "" &&
      field !== "" &&
      imgUrl !== null
    ) {
      const documentRef = doc(colRef, auth.currentUser.uid);

      setDoc(documentRef, {
        name: name,
        location: location,
        taxUnit: taxUnit,
        taxNo: taxNo,
        ownerName: ownerName,
        ownerTel: ownerTel,
        imgUrl: imgUrl,
        createdBy: auth.currentUser.uid,
        createDate: new Date(),
        isAccepted: false,
        restaurantTel: tel,
        openingTime: openingTime,
        closingTime: closingTime,
        address: address,
        field: field,
      })
        .then(() => {
          settext("BASVURUNUZ ALINMISTIR, YONLENDIRILIYORSUNUZ");
          setisSubmitting(false);
          setTimeout(() => (window.location.pathname = "/"), 3000);
        })
        .catch((error) => {
          console.log("Error creating document:", error);
        });
    } else {
      setisSubmitting(false);
      settext("LUTFEN BILGILERI EKSIKSIZ DOLDURUNUZ");
    }
  }
  return (
    <>
      <Navbar />
      <Container
        sx={{
          backgroundColor: "white",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="form"
          sx={{
            backgroundColor: "white",
            border: "1px solid black",
            borderTopRightRadius: "10px",
            borderTopLeftRadius: "10px",
            bgColor: "black",
            mt: 8,
            width: "600px",
            height: "700px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            "& > :not(style)": { m: 2, p: 0 },
          }}
          noValidate
          autoComplete="off"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                "& > :not(style)": { m: 1, p: 0 },
              }}
            >
              <TextField
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
                id="outlined-basic"
                label="ISLETME ISMI"
                variant="outlined"
              />

              <Box sx={{ position: "relative" }}>
                <Link
                  style={{ position: "absolute", right: "220px", top: "12px" }}
                >
                  ?
                </Link>
                <TextField
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  id="outlined-basic"
                  label="ISLETME LAT/LON"
                  variant="outlined"
                />
              </Box>

              <TextField
                value={taxUnit}
                onChange={(e) => setTaxUnit(e.target.value)}
                required
                id="outlined-basic"
                label="VERGI DAIRESI"
                variant="outlined"
              />
              <TextField
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                required
                id="outlined-basic"
                label="İŞLETME TELEFONU"
                variant="outlined"
              />
              <TextField
                value={closingTime}
                onChange={(e) => setClosingTime(e.target.value)}
                required
                id="outlined-basic"
                label="KAPANMA SAATI"
                variant="outlined"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                "& > :not(style)": { m: 1, p: 0 },
              }}
            >
              <TextField
                value={taxNo}
                onChange={(e) => setTaxNo(e.target.value)}
                required
                id="outlined-basic"
                label="VERGI NUMARASI"
                variant="outlined"
              />
              <TextField
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                required
                id="outlined-basic"
                label="YETKILI ISIM"
                variant="outlined"
              />
              <TextField
                value={ownerTel}
                onChange={(e) => setOwnerTel(e.target.value)}
                required
                id="outlined-basic"
                label="YETKILI TELEFON"
                variant="outlined"
              />
              <TextField
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                id="outlined-basic"
                label="AÇIK ADRES"
                variant="outlined"
              />
              <TextField
                value={openingTime}
                onChange={(e) => setOpeningTime(e.target.value)}
                required
                id="outlined-basic"
                label="AÇILMA SAATI"
                variant="outlined"
              />
            </Box>
          </Box>
          <Box sx={{ minWidth: 400 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Hangi Sektördesiniz
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={field}
                label="Hangi Sektördesiniz"
                onChange={(e) => {
                  setField(e.target.value);
                }}
              >
                <MenuItem value={"BURGER"}>HAMBURGER</MenuItem>
                <MenuItem value={"DONER"}>DONER</MenuItem>
                <MenuItem value={"PIZZA"}>PIZZA</MenuItem>
                <MenuItem value={"KEBAP-IZGARA"}>KEBAP-IZGARA</MenuItem>
                <MenuItem value={"TAVUK"}>TAVUK</MenuItem>
                <MenuItem value={"KOFTE"}>KOFTE</MenuItem>
                <MenuItem value={"PIDE-LAHMACUN"}>PIDE-LAHMACUN</MenuItem>
                <MenuItem value={"SOKAK-LEZZETLERI"}>SOKAK LEZZETLERI</MenuItem>
                <MenuItem value={"CIGKOFTE"}>CIGKOFTE</MenuItem>
                <MenuItem value={"TOST"}>TOST</MenuItem>
                <MenuItem value={"EV-YEMEKLERI"}>EV YEMEKLERI</MenuItem>
                <MenuItem value={"DUNYA-MUTFAGI"}>DUNYA MUTFAGI</MenuItem>
                <MenuItem value={"VEJETERYAN"}>VEJETERYAN</MenuItem>
                <MenuItem value={"KAHVALTI"}>KAHVALTI</MenuItem>
                <MenuItem value={"PASTANE-FIRIN"}>PASTANE/FIRIN</MenuItem>
                <MenuItem value={"SALATA"}>SALATA</MenuItem>
                <MenuItem value={"MANTI"}>MANTI</MenuItem>
                <MenuItem value={"DENIZ-URUNLERI"}>DENIZ URUNLERI</MenuItem>
                <MenuItem value={"TANTUNI"}>TANTUNI</MenuItem>
                <MenuItem value={"PILAV"}>PILAV</MenuItem>
                <MenuItem value={"MEZE"}>MEZE</MenuItem>
                <MenuItem value={"DONDURMA"}>DONDURMA</MenuItem>
                <MenuItem value={"TATLI"}>TATLI</MenuItem>
                <MenuItem value={"KAHVE"}>KAHVE</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ textAlign: "center" }}>
              ISLETME FOTOGRAFI
            </Typography>
            <TextField
              sx={{ width: "425px", height: "35px" }}
              id="outlined-basic"
              variant="outlined"
              type="file"
              onChange={(e) => {
                setImgUpload(e.target.files[0]);
              }}
            />
          </Box>
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
          {isSubmitting ? (
            <Button
              sx={{
                color: "white",
                width: "210px",
                height: "70px",
              }}
              disabled
              onClick={(e) => handleSubmit(e)}
              variant="contained"
            >
              {buttonText}
            </Button>
          ) : (
            <Button
              sx={{
                color: "white",
                width: "210px",
                height: "50px",
              }}
              variant="contained"
              onClick={(e) => handleSubmit(e)}
            >
              BASVURU YAP
            </Button>
          )}
          <Typography>{text}</Typography>
        </Box>
      </Container>
    </>
  );
}

export default RestaurantApplication;
