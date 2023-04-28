import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

function Login() {
  if (auth.currentUser) {
    window.location.pathname = "/";
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [text, settext] = useState("");
  const handleLogin = (e) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        window.location.pathname = "/";
      })
      .catch((err) => settext("HATALI KULLANICI ADI SIFRE"));
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
            width: "300px",
            height: "400px",
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
            value={password}
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            id="outlined-basic"
            label="Şifre"
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
            onClick={(e) => {
              handleLogin(e);
            }}
            sx={{ color: "white", width: "210px", height: "50px" }}
            variant="contained"
          >
            Giriş Yap
          </Button>
          <Button variant="text">
            <Link to={"/Register"}>Kayıt Ol</Link>
          </Button>
          <Button variant="text">
            <Link to={"/Register"}>Şifremi Unuttum</Link>
          </Button>
          <Typography>{text}</Typography>
        </Box>
      </Container>
    </>
  );
}

export default Login;
