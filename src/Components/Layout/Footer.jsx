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
        height: { xs: "210px", md: "100px" },
        backgroundColor: "#FA4A0C",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: { xs: "center", md: "space-between" },
        overflowY: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          height: { xs: "220px", md: "100px" },
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
          margin: "0 50px",
          overflowY: "hidden",
        }}
      >
        <Box>
          <img src={indiriooLogo} style={{ width: "120px", height: "23px" }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: "40px",
            marginRight: "40px",
          }}
        >
          <Box>
            <Link to={"/Privacy"}>
              <Typography
                sx={{ fontSize: 20, fontWeight: 800, color: "white" }}
              >
                GIZLILIK SOZLESMESI
              </Typography>
            </Link>
          </Box>
          <Box>
            <Link to={"/KVKK"}>
              <Typography
                sx={{ fontSize: 20, fontWeight: 800, color: "white" }}
              >
                KVKK
              </Typography>
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img src={indiriooAvatar} style={{ width: "60px", height: "60px" }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <InstagramIcon
              sx={{ width: "23px", height: "23px", color: "white" }}
            />
            <TwitterIcon
              sx={{ width: "23px", height: "23px", color: "white" }}
            />
            <YouTubeIcon
              sx={{ width: "23px", height: "23px", color: "white" }}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "grid", placeItems: "center", height: "20px" }}>
        <Typography sx={{ fontSize: "10", fontWeight: "700" }}>
          COPYRIGHT BY: indirioo.com
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
