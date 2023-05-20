import React, { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Button from "@mui/material/Button";
import { onSnapshot, collection } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { db, auth } from "../../../firebase";

function Users() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "users");

    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      let users = [];
      snapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setData(users);
    });

    console.log(data);
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <Container>
      <Box
        sx={{
          width: "100%",
          height: "70px",
          display: "grid",
          placeItems: "center",
        }}
      >
        <PeopleAltIcon sx={{ width: "30px", height: "30px" }} />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>E-POSTA</TableCell>
              <TableCell align="right">RESTORAN SAHIPLIK DURUMU</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.mail}
                </TableCell>
                <TableCell align="right">
                  {row.restaurantOwner ? "EVET" : "HAYIR"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Users;
