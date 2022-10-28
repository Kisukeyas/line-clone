import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

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
      <h3 className="header-item">{auth.currentUser.displayName}</h3>
      <Button color="inherit">
        <Link to="/">ユーザー一覧</Link>
      </Button>
      <Button color="inherit">
        <Link to="/rooms">チャットルームへ移動</Link>
      </Button>
      <Button
        color="inherit"
        onClick={() => logOut(auth)}
        style={{ padding: "0 40px" }}
      >
        ログアウト
      </Button>
    </header>
  );
}

export default Header;
