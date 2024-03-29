//REACT

import "./Navbar.css";

import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import indiriooAvatar from "../../Assets/indiriooAvatar.png";
import indiriooLogo from "../../Assets/indiriooLogo.png";

//MATERIAL UI

const drawerWidth = 150;
const navItems = [["ANA SAYFA", ""]];

function Navbar(props) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [panel, setPanel] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef).then((doc) => {
          if (doc.data().isAdmin === true) {
            setPanel(true);
            setIsAdmin(true);
          } else if (doc.data().restaurantOwner === true) {
            setPanel(true);
          }
        });
        setIsLogged(true);
      } else {
        setIsLogged(false);
        setPanel(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const [isLogged, setIsLogged] = useState(null);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <img
        onClick={() => {
          <Link to={"/"} />;
        }}
        src={indiriooAvatar}
        style={{ width: "60px", height: "60px" }}
      />
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText
                primary={
                  <Link underline="none" color="inherit" to={`/${item[1]}`}>
                    {item[0]}
                  </Link>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}

        {panel && (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText
                primary={
                  <Link underline="none" color="inherit" to={`/Panel`}>
                    Panel
                  </Link>
                }
              />
            </ListItemButton>
          </ListItem>
        )}

        {isLogged ? (
          <Box>
            <Button
              sx={{ color: "white" }}
              onClick={(e) => {
                signOut(auth);
              }}
            >
              CIKIS YAP
            </Button>
          </Box>
        ) : (
          <Box>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText
                  primary={
                    <Link underline="none" color="inherit" to={"/Login"}>
                      GIRIS YAP
                    </Link>
                  }
                />
              </ListItemButton>
            </ListItem>
          </Box>
        )}
        {isLogged ? (
          <Link
            style={{ fontSize: "16px", color: "#fff" }}
            to={"/RestaurantApplication"}
          >
            Bizimle Çalış
          </Link>
        ) : (
          <Link
            to={"/Login"}
            style={{ marginRight: "50px", color: "white", width: "50px" }}
          >
            <Button
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                width: "100px",
                marginRight: "50px",
                display: { xs: "none", sm: "flex" },
                color: "#fff",
              }}
            >
              GIRIS YAP
            </Button>
          </Link>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar sx={{ bgColor: "#FA4A0C" }} component="nav">
        <Toolbar
          sx={{
            backgroundColor: "#FA4A0C",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <Link to={"/"}>
              <img
                onClick={() => {}}
                src={indiriooLogo}
                style={{ width: "120px", height: "30px", marginLeft: "30px" }}
              />
            </Link>
            <Link to={"/"}>
              <img
                onClick={() => {}}
                src={indiriooAvatar}
                style={{ width: "60px", height: "60px" }}
              />
            </Link>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: "10px" }}>
            {navItems.map((item, idx) => (
              <Button key={idx} sx={{ fontSize: "14px", color: "#fff" }}>
                {
                  <Link underline="none" color="inherit" to={`/${item[1]}`}>
                    {item[0]}
                  </Link>
                }
              </Button>
            ))}
            {panel && (
              <Button sx={{ fontSize: "14px", color: "#fff" }}>
                <Link underline="none" color="inherit" to={`/Panel`}>
                  Panel
                </Link>
              </Button>
            )}
          </Box>
          {isLogged ? (
            <Button sx={{ fontSize: "14px", color: "#fff" }}>
              <Link to={"/RestaurantApplication"}>Bizimle Çalış</Link>
            </Button>
          ) : (
            <Link
              to={"/Login"}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "25px",
                color: "white",
                width: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                width: "100px",
                display: { xs: "none", sm: "flex" },
                color: "#fff",
              }}
            >
              GIRIS YAP
            </Link>
          )}
          {isLogged ? (
            <Button
              sx={{ fontSize: "16px", color: "#fff" }}
              onClick={(e) => {
                signOut(auth);
              }}
            >
              CIKIS YAP
            </Button>
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              bgcolor: "#FD841F",
              color: "white",
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Navbar;
