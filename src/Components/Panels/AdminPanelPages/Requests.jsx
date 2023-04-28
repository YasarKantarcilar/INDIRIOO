import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import {
  collection,
  where,
  query,
  getDocs,
  setData,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../firebase";
import Image from "mui-image";
import CheckIcon from "@mui/icons-material/Check";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";

function Requests() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "Restaurants");

    onSnapshot(query(colRef, where("isAccepted", "==", false)), (snapshot) => {
      let applications = [];
      snapshot.docs.forEach((document) => {
        applications.push({ ...document.data() });
      });
      setData(applications);
    });
  }, []);
  return (
    <Container sx={{ marginTop: "10px" }}>
      <Box sx={{ width: "100%", display: "grid", placeItems: "center" }}>
        <AddBusinessIcon sx={{ width: "50px", height: "50px" }} />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          gap: "5px",
        }}
      >
        {data.map((request, idx) => (
          <Box
            key={idx}
            sx={{
              borderRadius: "15px",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              width: { xs: "32%", sm: "24%" },
              height: "400px",
            }}
          >
            <Box sx={{ height: "150px" }}>
              <Image
                style={{
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                }}
                src={request.imgUrl}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                width: "70%",
                height: "240px",
                marginLeft: "10px",
              }}
            >
              <Typography>RESTORAN ISMI: {request.name}</Typography>
              <Typography sx={{ maxHeight: "55px", width: "50%" }}>
                KONUM:
                {request.location}
              </Typography>
              <Typography>SAHIBININ ISMI: {request.ownerName}</Typography>
              <Typography>SAHIBININ TEL: {request.ownerTel}</Typography>
              <Typography>VERGI DAIRESI: {request.taxUnit}</Typography>
              <Typography>VERGI NUMARASI: {request.taxNo}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
                gap: "5px",
              }}
            >
              <Button
                sx={{
                  height: "30px",
                  backgroundColor: "green",
                  width: "50px",
                  color: "white",
                  border: "2 px solid black",
                  "&:hover": {
                    backgroundColor: "none",
                    color: "green",
                  },
                }}
                variant="outlined"
                onClick={() => {
                  const restaurantDocRef = doc(
                    db,
                    "Restaurants",
                    request.createdBy
                  );
                  updateDoc(restaurantDocRef, {
                    isAccepted: true,
                  }).then(() => {
                    console.log("DOCUMENT UPDATED");
                    const userDocRef = doc(db, "users", request.createdBy);
                    updateDoc(userDocRef, {
                      restaurantOwner: true,
                    }).then(() => console.log("USER DOCUMENT UPDATED"));
                  });
                }}
              >
                <CheckIcon />
              </Button>
              <Button
                sx={{
                  height: "30px",
                  backgroundColor: "red",
                  width: "50px",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "none",
                    color: "red",
                  },
                }}
                variant="outlined"
                onClick={() => {
                  const deleteDocRef = doc(
                    db,
                    "Restaurants",
                    request.createdBy
                  );
                  deleteDoc(deleteDocRef).then(() =>
                    console.log("DOCUMENT DELETED")
                  );
                }}
              >
                <NotInterestedIcon />
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default Requests;
