import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { collection, onSnapshot } from "firebase/firestore";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { deleteUser } from "firebase/auth";

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
              <TableCell>Ad Soyad</TableCell>
              <TableCell>Telefon</TableCell>
              <TableCell>Kullanılan Kodlar</TableCell>
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
                <TableCell component="th" scope="row">
                  {row.name && row.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.phone && row.phone}
                </TableCell>
                {<row className="usedCodes"></row> && (
                  <TableCell component={"th"} scope="row">
                    <select
                      style={{
                        width: "150px",
                        height: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <option defaultValue={0}>
                        KOD TOPLAM:
                        {row.usedCodes.length > 0 ? row.usedCodes.length : 0}
                      </option>
                      {row.usedCodes.map((code, idx) => (
                        <option>{code}</option>
                      ))}
                    </select>
                  </TableCell>
                )}
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
