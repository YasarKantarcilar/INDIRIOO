import React, { useState, useEffect } from "react";
import { Box, Button, Container } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../../firebase";

function AdminPanelRestaurants() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "Restaurants");

    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      let Restaurants = [];
      snapshot.forEach((doc) => {
        Restaurants.push({ ...doc.data(), id: doc.id });
      });
      setData(Restaurants);
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
        <Table
          sx={{ minWidth: 650, overflowY: "scroll" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>RESTORAN ISMI</TableCell>
              <TableCell align="right">RESTORAN SEKTOR</TableCell>
              <TableCell align="right">SAHIBININ TELEFON</TableCell>
              <TableCell align="right">SAHIBININ ISMI</TableCell>
              <TableCell align="right">VERGI NUMARASI</TableCell>
              <TableCell align="right">VERGI DAIRESI</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right" component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right" component="th" scope="row">
                  {row.field}
                </TableCell>
                <TableCell align="right" component="th" scope="row">
                  {row.ownerTel}
                </TableCell>
                <TableCell align="right" component="th" scope="row">
                  {row.ownerName}
                </TableCell>
                <TableCell align="right" component="th" scope="row">
                  {row.taxNo}
                </TableCell>
                <TableCell align="right" component="th" scope="row">
                  {row.taxUnit}
                </TableCell>
                <TableCell align="right" component="th" scope="row">
                  <Button
                    variant="contained"
                    sx={{ color: "white" }}
                    onClick={() => {
                      window.location.pathname = `/Panel/${row.createdBy}`;
                    }}
                  >
                    YONET
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default AdminPanelRestaurants;
