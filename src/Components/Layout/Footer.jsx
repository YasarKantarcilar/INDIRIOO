import React from "react";
import { Box, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import indiriooLogo from "../../Assets/indiriooLogo.png";
import indiriooAvatar from "../../Assets/indiriooAvatar.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "220px",
        backgroundColor: "#FA4A0C",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
          margin: "0 50px",
        }}
      >
        <Box>
          <img src={indiriooLogo} style={{ width: "120px", height: "30px" }} />
        </Box>
        <Box>
          <Link to={"/Privacy"}>
            <Typography sx={{ fontSize: 20, fontWeight: 800, color: "white" }}>
              GIZLILIK SOZLESMESI
            </Typography>
          </Link>
        </Box>
        <Box>
          <Link to={"/KVKK"}>
            <Typography sx={{ fontSize: 20, fontWeight: 800, color: "white" }}>
              KVKK
            </Typography>
          </Link>
        </Box>
        <Box>
          <img
            src={indiriooAvatar}
            style={{ width: "150px", height: "150px" }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <InstagramIcon
              sx={{ width: "30px", height: "30px", color: "white" }}
            />
            <TwitterIcon
              sx={{ width: "30px", height: "30px", color: "white" }}
            />
            <YouTubeIcon
              sx={{ width: "30px", height: "30px", color: "white" }}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "grid", placeItems: "center" }}>
        <Typography sx={{ fontSize: "30", fontWeight: "700" }}>
          COPYRIGHT BY: indirioo.com
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
