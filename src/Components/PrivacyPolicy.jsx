import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";

import Navbar from "./Layout/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import uuid from "uuid-random";

function Privacy() {
  const [policyData, setpolicyData] = useState([]);
  const [value, setValue] = useState("");
  const [isAdmin, setisAdmin] = useState(false);
  const colRef = collection(db, "policy");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef).then((doc) => {
          if (doc.data().isAdmin === true) {
            setisAdmin(true);
          }
        });
      }
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const policies = [];
    const q = query(collection(db, "policy"), orderBy("date"));

    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        policies.push(doc.data());
      });
      setpolicyData(policies);
    });
  }, []);

  const handleAdd = () => {
    let id = uuid();
    setDoc(doc(colRef, id), {
      message: value,
      uid: id,
      isHeader: false,
      date: new Date(),
    })
      .then((res) => {
        setpolicyData([
          ...policyData,
          { message: value, uid: id, isHeader: false },
        ]);
        setValue("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleHeaderAdd = () => {
    let id = uuid();
    setDoc(doc(colRef, id), {
      message: value,
      uid: id,
      isHeader: true,
      date: new Date(),
    })
      .then((res) => {
        setpolicyData([
          ...policyData,
          { message: value, uid: id, isHeader: true },
        ]);
        setValue("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Navbar />
      <Container
        sx={{
          marginTop: "70px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: "50px",
        }}
      >
        {isAdmin && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              marginTop: "20px",
              width: "100%",
            }}
          >
            <TextField
              onChange={(e) => {
                setValue(e.target.value);
              }}
              value={value}
              sx={{ width: "70%" }}
              id="outlined-basic"
              label="BASLIK VEYA POLITIKA GIRINIZ"
              variant="outlined"
              multiline
              minRows={15}
              maxRows={500}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "70%",
              }}
            >
              <Button
                //TIKLANDIGINDA signOut FONKSIYONU ILE CIKIS SAGLIYORUZ
                onClick={handleHeaderAdd}
                sx={{
                  marginTop: "25px",
                  width: "200px",
                  height: "45px",
                  backgroundColor: "#373737",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#373737",
                    border: "2px solid #373737",
                  },
                }}
                variant="contained"
              >
                BAŞLIK OLARAK EKLE
              </Button>
              <Button
                //TIKLANDIGINDA signOut FONKSIYONU ILE CIKIS SAGLIYORUZ
                onClick={handleAdd}
                sx={{
                  marginTop: "25px",
                  width: "200px",
                  height: "45px",
                  backgroundColor: "#373737",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#373737",
                    border: "2px solid #373737",
                  },
                }}
                variant="contained"
              >
                EKLE
              </Button>
            </Box>
          </Box>
        )}
        <Typography
          sx={{ color: "black", textAlign: "center", width: "100%" }}
          variant="h3"
        >
          POLITIKALARIMIZ
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "50px",
          }}
        >
          {policyData.map((policy, idx) => (
            <Box
              key={idx}
              sx={{
                width: "100%",
                minHeight: "50px",
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              {isAdmin && (
                <Button
                  onClick={() => {
                    const policyRef = doc(collection(db, "policy"), policy.uid);
                    deleteDoc(policyRef)
                      .then(() => {
                        const newPolicyData = policyData.filter(function (
                          policyMessage
                        ) {
                          return policyMessage.message !== policy.message;
                        });
                        setpolicyData(newPolicyData);
                      })
                      .catch((err) => {
                        console.log("COULDN'T DELETE", err);
                      });
                  }}
                  sx={{
                    backgroundColor: "red",
                    border: "2px solid #373737",
                    color: "white",
                    marginRight: "15px",
                    "&:hover": {
                      backgroundColor: "white",
                      color: "#373737",
                      border: "2px solid #373737",
                    },
                  }}
                  variant="contained"
                >
                  SIL
                </Button>
              )}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: "100%",
                }}
              >
                {policy.isHeader ? (
                  <Typography
                    variant="h3"
                    sx={{ textAlign: "center", width: "100%" }}
                  >
                    {policy.message}
                  </Typography>
                ) : (
                  <Typography variant="h6" sx={{ width: "100%" }}>
                    *{policy.message}
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
}

export default Privacy;
