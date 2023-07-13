import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { Container } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const colRef = collection(db, "users");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isChecked, setisChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      } else {
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogin = (e) => {
    if (password1 === password2 && isChecked && email !== "") {
      createUserWithEmailAndPassword(auth, email, password1)
        .then((userCred) => {
          const userId = userCred.user.uid;
          setDoc(doc(colRef, userId), {
            mail: userCred.user.email,
            uid: userCred.user.uid,
            isAdmin: false,
            restaurantOwner: false,
            name: "",
            phone: "",
            usedCodes: [],
            createDate: new Date(),
          })
            .then(() => {
              navigate("/");
            })
            .catch((error) => console.error("Error writing document: ", error));
        })
        .catch((error) => console.log(error.message));
    }
  };

  return (
    <>
      <Navbar />
      <Container
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleLogin(e);
          }
        }}
        sx={{
          backgroundColor: "white",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin(e);
            }
          }}
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
            type="password"
          />

          <Box
            sx={{
              width: "220px",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              control={<Checkbox />}
              onChange={(e) => {
                setisChecked(e.target.checked);
              }}
            />
            <Link
              to={"https://indirioo.com/#/Privacy"}
              style={{ color: "orange" }}
            >
              Sözleşmeleri, Okudum. Onaylıyorum
            </Link>
          </Box>

          <Button
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin(e);
              }
            }}
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
