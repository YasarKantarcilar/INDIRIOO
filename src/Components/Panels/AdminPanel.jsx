import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import Requests from "./AdminPanelPages/Requests";
import Users from "./AdminPanelPages/Users";
import AdminPanelRestaurants from "./AdminPanelPages/AdminPanelRestaurants";

function AdminPanel() {
  const [pageNumber, setPageNumber] = useState(1);
  const sidebarItems = [
    {
      name: "ANA SAYFA",
      pageNumber: 1,
      icon: <HomeSharpIcon sx={{ width: "30px", height: "30px" }} />,
    },
    {
      name: "RESTORAN ISTEKLERI",
      pageNumber: 2,
      icon: <AddBusinessIcon sx={{ width: "30px", height: "30px" }} />,
    },
    {
      name: "KULLANICILAR",
      pageNumber: 3,
      icon: <PeopleAltIcon sx={{ width: "30px", height: "30px" }} />,
    },
    {
      name: "RESTORANLAR",
      pageNumber: 4,
      icon: <StorefrontIcon sx={{ width: "30px", height: "30px" }} />,
    },
    {
      name: "KULLANILAN KUPONLAR",
      pageNumber: 5,
      icon: <ConfirmationNumberIcon sx={{ width: "30px", height: "30px" }} />,
    },
  ];
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          display: "flex",
          position: "fixed",

          flexDirection: "column",
          left: "0",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset",
          width: { xs: "30vw", sm: "20vw" },
          height: "100vh",
          paddingTop: "64px",
          backgroundColor: "#FA4A0C",
        }}
      >
        <Box sx={{ width: { xs: "30vw", sm: "20vw" }, height: "30%" }}></Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {sidebarItems.map((item, idx) => (
            <Box
              key={idx}
              sx={{
                paddingLeft: "10px",
                width: { xs: "30vw", sm: "20vw" },
                height: "35px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                transition: "0.5s",
                color: "white",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "white",
                  color: "black",
                },
              }}
              onClick={(e) => setPageNumber(item.pageNumber)}
            >
              <Box
                sx={{
                  width: "35px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </Box>
              <Typography
                sx={{ fontSize: "20px", marginLeft: "5px", width: "80%" }}
              >
                {item.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          width: { xs: "70vw", sm: "80vw" },
          height: "100vh",
          paddingTop: "64px",
          position: "absolute",
          right: 0,
        }}
      >
        {pageNumber === 2 && <Requests />}
        {pageNumber === 3 && <Users />}
        {pageNumber === 4 && <AdminPanelRestaurants />}
      </Box>
    </Box>
  );
}

export default AdminPanel;
