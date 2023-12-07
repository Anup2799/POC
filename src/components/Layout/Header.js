import React, { useState } from "react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import "../../styles/HeaderStyles.css";
import Zen from "../Layout/img/Zen.png";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [publicationAnchor, setPublicationAnchor] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handlePublicationClick = (event) => {
    setPublicationAnchor(event.currentTarget);
  };

  const handlePublicationClose = () => {
    setPublicationAnchor(null);
  };

  const handlePublicationMouseLeave = () => {
    setPublicationAnchor(null);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100%",
      }}
    >
      <img src={Zen} alt="Zenlab Logo" style={{ width: "150px" }} />
      <Divider />
      <ul className="mobile-navigation">
        <li>
          <NavLink to="/Home">
            <strong>Home</strong>
          </NavLink>
        </li>
        <li>
          <NavLink to="/Assets">
            <strong>Asset Showcase</strong>
          </NavLink>
        </li>
        <li onClick={handlePublicationClick} style={{ cursor: "pointer" }}>
          <strong>Publications</strong>
        </li>
        {Boolean(publicationAnchor) && (
          <>
            <li>
              <NavLink to="/pages/Patents" style={{ textDecoration: "none" }}>
                <strong>Patents &gt;&gt;</strong>
              </NavLink>
            </li>
            <li>
              <NavLink to="/pages/Whitepapers" style={{ textDecoration: "none" }}>
                <strong>Whitepapers & Blogs &gt;&gt;</strong>
              </NavLink>
            </li>
          </>
        )}
        <li>
          <a href="mailto:example@example.com">
            <strong>Contact Us</strong>
          </a>
        </li>
      </ul>
    </Box>
  );

  return (
    <Box>
      <AppBar
        position="fixed"
        component={"nav"}
        sx={{
          bgcolor: "#000",
          height: "80px",
          zIndex: 1000,
          display: "flex",
          justifyContent: "space-between",
          padding: "0 20px",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{
              display: { sm: "none" },
            }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
            <img src={Zen} alt="Zenlab Logo" style={{ width: "90px" }} />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: "bold",
                fontStyle: "italic",
                color: "#fff",
                marginLeft: "20px",
                fontFamily: "Arial, sans-serif",
                fontSize: "16px",
              }}
            >
              <strong>ZenLabs - Asset Showcase</strong>
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ul className="navigation-menu">
              <li>
                <NavLink to="/Home">
                  <strong>Home</strong>
                </NavLink>
              </li>
              <li>
                <NavLink to="/Assets">
                  <strong>Asset Showcase</strong>
                </NavLink>
              </li>
              <li
                onMouseEnter={handlePublicationClick}
                onMouseLeave={handlePublicationMouseLeave}
                style={{ cursor: "pointer" }}
              >
                <strong>Publications </strong>
                <Menu
                  anchorEl={publicationAnchor}
                  open={Boolean(publicationAnchor)}
                  onClose={handlePublicationClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  getContentAnchorEl={null}
                >
                  <MenuItem onClick={handlePublicationClose}>
                    <NavLink to="/pages/Patents" style={{ textDecoration: "none" }}>
                      <strong>Patents &gt;&gt;</strong>
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handlePublicationClose}>
                    <NavLink to="/pages/Whitepapers" style={{ textDecoration: "none" }}>
                      <strong>Whitepapers & Blogs &gt;&gt;</strong>
                    </NavLink>
                  </MenuItem>
                </Menu>
              </li>
              <li>
                <a href="mailto:example@example.com">
                  <strong>Contact Us</strong>
                </a>
              </li>
            </ul>
          </Box>
        </Toolbar>
      </AppBar>

      <Toolbar sx={{ height: "80px" }} />

      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "240px",
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Header;
