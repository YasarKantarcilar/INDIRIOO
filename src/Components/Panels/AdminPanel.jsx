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
import { db, auth } from "../../firebase";
import Image from "mui-image";

import React, { useEffect, useState } from "react";

function AdminPanel() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "Restaurants");
    const stateQuery = query(colRef, where("isAccepted", "==", false));

    onSnapshot(query(colRef, where("isAccepted", "==", false)), (snapshot) => {
      let applications = [];
      snapshot.docs.forEach((document) => {
        applications.push({ ...document.data() });
      });
      setData(applications);
    });
    console.log("data", data);

    /* const application = [];
    getDocs(stateQuery)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          applications.push(doc.data());
        });
        console.log(application);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      }); */
  }, []);
  console.log(data.location);
  return (
    <Container sx={{ marginTop: "75px" }}>
      <Typography sx={{ textAlign: "center" }} variant="h3">
        RESTORAN ISTEKLERI
      </Typography>
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
              display: "flex",
              gap: "5px",
              border: "2px solid #E14D2A",
              width: { xs: "99%", sm: "49%" },
              height: "250px",
            }}
          >
            <Box sx={{ width: "40%", height: "250px" }}>
              <Image src={request.imgUrl} />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "60%",
                height: "240px",
              }}
            >
              <Typography>RESTORAN ISMI: {request.name}</Typography>
              <Typography>KONUM: {request.location}</Typography>
              <Typography>SAHIBININ ISMI: {request.ownerName}</Typography>
              <Typography>SAHIBININ TEL: {request.ownerTel}</Typography>
              <Typography>VERGI NUMARASI: {request.taxNo}</Typography>
              <Typography>VERGI DAIRESI: {request.taxUnit}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Button
                sx={{
                  height: "40px",
                  backgroundColor: "green",
                  width: "80px",
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
                KABUL ET
              </Button>
              <Button
                sx={{ height: "40px", backgroundColor: "red", width: "80px" }}
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
                SIL
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default AdminPanel;
