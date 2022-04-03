import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./Nav.css";
import { Link } from "react-router-dom";

const Nav = ({ logout, user }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#1E8449" }}>
        <Toolbar>
          {user.Tipo === 2 ? (
            <>
              <Link
                to="/Usuarios"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <IconButton color="inherit">
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Usuarios
                  </Typography>
                </IconButton>
              </Link>
            </>
          ) : null}
          <Link
            to="/paymentConcepts"
            style={{ textDecoration: "none", color: "#fff" }}
          >
            <IconButton color="inherit">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Conceptos
              </Typography>
            </IconButton>
          </Link>

          <Link
            to="/Suppliers"
            style={{ textDecoration: "none", color: "#fff" }}
          >
            <IconButton color="inherit">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Suplidores
              </Typography>
            </IconButton>
          </Link>

          <Link
            to="/Solicitud"
            style={{ textDecoration: "none", color: "#fff" }}
          >
            <IconButton color="inherit">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Solicitud de cheques
              </Typography>
            </IconButton>
          </Link>
          {user.Tipo === 2 ? (
            <Link
              to="/Cheques"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <IconButton color="inherit">
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Cheques
                </Typography>
              </IconButton>
            </Link>
          ) : null}
          <IconButton
            color="inherit"
            style={{ margin: 0, right: 0, position: "absolute" }}
          >
            <AccountCircleIcon
              onClick={logout}
              style={{
                width: "50px",
                height: "50px",
              }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;
