import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import SmsIcon from "@mui/icons-material/Sms";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";

function Header() {
  function logOut(auth) {
    signOut(auth)
      .then(() => {
        console.log("ログアウトしました。");
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <header>
      <h3 className="header-item">Chat App</h3>
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "white",
        }}
      >
        <IconButton color="inherit">
          <PeopleIcon />
        </IconButton>
      </Link>
      <Link
        to="/rooms"
        style={{
          textDecoration: "none",
          color: "white",
        }}
      >
        <IconButton color="inherit">
          <SmsIcon />
        </IconButton>
      </Link>
      <IconButton
        color="inherit"
        onClick={() => logOut(auth)}
        style={{
          marginLeft: "auto",
          paddingRight: "20px",
        }}
      >
        <LogoutIcon />
      </IconButton>
    </header>
  );
}

export default Header;
