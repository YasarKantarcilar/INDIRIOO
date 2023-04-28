import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

function Register() {
  if (auth.currentUser) {
    window.location.pathname = "/";
  }
  const colRef = collection(db, "users");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleLogin = (e) => {
    if (password1 === password2) {
      createUserWithEmailAndPassword(auth, email, password1)
        .then((userCred) => {
          const userId = userCred.user.uid;
          setDoc(doc(colRef, userId), {
            mail: userCred.user.email,
            uid: userCred.user.uid,
            isAdmin: false,
            password: password1,
            restaurantOwner: false,
            createDate: new Date(),
          })
            .then(() => {
              window.location.pathname = "/";
            })
            .catch((error) => console.error("Error writing document: ", error));
        })
        .catch((error) => console.log(error.message));
    } else {
      console.log("PASSWORDS DOESNT MATCH");
    }
  };

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
            width: "350px",
            height: "450px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            "& > :not(style)": { m: 1, p: 0 },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
          <TextField
            value={password1}
            onChange={(e) => {
              setPassword1(e.target.value);
            }}
            id="outlined-basic"
            label="Şifre"
            variant="outlined"
            type="password"
          />
          <TextField
            value={password2}
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
            id="outlined-basic"
            label="Şifre Tekrar"
            variant="outlined"
          />

          <Box
            sx={{
              width: "210px",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <FormControlLabel
              sx={{ marginRight: "50px" }}
              control={<Checkbox />}
              label="Beni Hatırla"
            />
          </Box>

          <Button
            onClick={(e) => handleLogin(e)}
            sx={{ color: "white", width: "210px", height: "50px" }}
            variant="contained"
          >
            Kayıt Ol
          </Button>
          <Link style={{ color: "orange" }} to={"/Login"}>
            Hesabın var mı?
          </Link>
        </Box>
      </Container>
    </>
  );
}

export default Register;
