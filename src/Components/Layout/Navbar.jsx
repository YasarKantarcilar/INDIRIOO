//REACT
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

//MATERIAL UI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { auth, db } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

const drawerWidth = 150;
const navItems = [
  ["ANA SAYFA", ""],
  ["Panel", "Panel"],
  ["ILETISIM", "Contact"],
];

function Navbar(props) {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef).then((doc) => {});
        setIsLogged(true);
      } else {
        console.log("NOT LOGGED");
        setIsLogged(false);
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
      <Typography variant="h6" sx={{ my: 2 }}>
        INDIRIOO
      </Typography>
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
        {isLogged ? (
          <Button
            sx={{ color: "white" }}
            onClick={(e) => {
              signOut(auth);
            }}
          >
            CIKIS YAP
          </Button>
        ) : (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText
                primary={
                  <Link underline="none" color="inherit" to={"/Login"}>
                    Giriş Yap
                  </Link>
                }
              />
            </ListItemButton>
          </ListItem>
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
              Giriş Yap
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
      <AppBar sx={{ bgColor: "#f57c00" }} component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            INDIRIOO
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: "10px" }}>
            {navItems.map((item, idx) => (
              <Button key={idx} sx={{ fontSize: "16px", color: "#fff" }}>
                {
                  <Link underline="none" color="inherit" to={`/${item[1]}`}>
                    {item[0]}
                  </Link>
                }
              </Button>
            ))}
          </Box>
          {isLogged ? (
            <Button sx={{ fontSize: "16px", color: "#fff" }}>
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
                fontSize: "16px",
                width: "100px",
                display: { xs: "none", sm: "flex" },
                color: "#fff",
              }}
            >
              Giriş Yap
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
